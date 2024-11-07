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
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = User.create({ name, email, password: hashedPassword });
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ message: "User created successfully", token });
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
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(createError(401, "Invalid credentials"));
    }
    const passwordMatch = bcrypt.compareSync(password, existingUser.password);
    if (!passwordMatch) {
      return next(createError(401, "Invalid credentials"));
    }
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Login successful",
      token,
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
      if (user.resetPasswordAttempts >= 4) {
        return next(
          createError(
            429,
            "You have reached the maximum of 4 reset requests within 24 hours"
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
    )}/api/auth/resetPassword/${resetToken}`;
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

    // Update password and clear reset fields
    user.password = bcrypt.hashSync(password, 10);
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
