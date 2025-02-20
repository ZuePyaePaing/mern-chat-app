import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
import { createError } from "../utils/error.js";
import sendEmail from "../utils/sendEmail.js";

dotenv.config();

// register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, terms } = req.body;

    if (!terms) {
      return next(createError(400, "Please accept terms and conditions"));
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(createError(400, "User already exists"));
    }

    if (password !== confirmPassword) {
      return next(createError(400, "Passwords do not match"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Determine if the user is an admin
    const isAdmin = email === "kaunglay24588@gmail.com";
    await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// login
export const login = async (req, res, next) => {
  try {
    const { email, password, terms } = req.body;
    if (!terms) {
      return next(createError(400, "Please accept terms and conditions"));
    }
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return next(createError(401, "Invalid credentials"));
    }
    const passwordMatch = bcrypt.compareSync(password, existingUser.password);
    if (!passwordMatch) {
      return next(createError(401, "Invalid credentials"));
    }
    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = existingUser.toObject();
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

// One day in milliseconds
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    // Check if reset requests have exceeded the limit within 24 hours
    const currentTime = Date.now();
    if (
      user.resetPasswordLastAttempt &&
      currentTime - user.resetPasswordLastAttempt.getTime() < ONE_DAY_IN_MS
    ) {
      if (user.resetPasswordAttempts >= 10) {
        return next(
          createError(
            429,
            "You have reached the maximum of 10 reset requests within 24 hours"
          )
        );
      }
    } else {
      // Reset the attempts if 24 hours have passed
      user.resetPasswordAttempts = 0;
    }
    user.resetPasswordAttempts += 1;
    user.resetPasswordLastAttempt = new Date(currentTime);
    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send the reset link via email
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please use this link to reset your password: ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
};

// reset password
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return next(createError(400, "Invalid or expired token"));
    }
    const salt = bcrypt.genSaltSync(10);
    // Update password and clear reset fields
    user.password = bcrypt.hashSync(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.resetPasswordAttempts = 0;
    user.resetPasswordLastAttempt = undefined;
    await user.save();
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    next(error);
  }
};

// change password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return next(createError(400, "Incorrect password"));
    }
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(newPassword, salt);
    await user.save();
    res.status(200).json({ message: "Password has been changed successfully" });
  } catch (error) {
    next(error);
  }
};
// get profile
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
// change name
export const changeName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    user.name = name;
    await user.save();
    res.status(200).json({ message: "Name has been changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const changeProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    user.avatar = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    await user.save();
    res
      .status(200)
      .json({ message: "User profile has been changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const addBioStatus = async (req, res, next) => {
  try {
    const { bio } = req.body;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    user.bio = bio;
    await user.save();
    return res
      .status(200)
      .json({ message: "Bio has been changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if(!userId){
      return next(createError(404, "User not found"));
    }
    const user = await User.findById(userId).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
