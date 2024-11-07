import { Router } from "express";
import {
  registerValidaton,
  loginValidation,
} from "../validations/authValidations.js";
import { validationResultHandler } from "../utils/validationResultHandler.js";
import {
  register,
  login,
  forgetPassword,
  resetPassword,
} from "../controllers/auth.controllers.js";

const router = Router();

// POST /retister
router.post("/register", registerValidaton, register);

// POST /login
router.post("/login", loginValidation, validationResultHandler, login);

// POST //forget-password
router.post("/forget-password", forgetPassword);

// POST /reset-assword/:token
router.post("/reset-assword/:token", resetPassword);

export default router;
