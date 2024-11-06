import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
import { createError } from "../utils/error.js";
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
      return next(createError(401,"Invalid credentials" )) 
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
