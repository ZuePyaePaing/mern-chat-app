import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();
const isLogin = async (req, res, next) => {
  try {
    // whit bearer token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(createError(401, "You are not authenticated!"));
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(createError(403, "Token is not valid"));
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};

export default isLogin;
