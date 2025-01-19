import { Router } from "express";
import {
  registerValidaton,
  loginValidation,
  resetPasswordValidation,
  changePasswordValidation,
  changeNameValidation,
} from "../validations/authValidations.js";
import { validationResultHandler } from "../utils/validationResultHandler.js";
import {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  changeName,
  changeProfile,
  getProfile,
} from "../controllers/auth.controllers.js";
import isLogin from "../middlewares/isLogin.js";
import upload from "../middlewares/upload.js";

const router = Router();
// POST /retister
router.post("/register", registerValidaton, register);
// POST /login
router.post("/login", loginValidation, validationResultHandler, login);
// POST //forget-password
router.post("/forget-password", forgetPassword);
// POST /reset-assword/:token
router.post(
  "/reset-password/:token",
  resetPasswordValidation,
  validationResultHandler,
  resetPassword
);
// POST /change-password
router.post(
  "/change-password",
  isLogin,
  changePasswordValidation,
  validationResultHandler,
  changePassword
);
//GET '/profile'
router.get("/profile", isLogin, getProfile);
// POST /change-name
router.post(
  "/change-name",
  isLogin,
  changeNameValidation,
  validationResultHandler,
  changeName
);
// POST /change-profile-image
router.post(
  "/change-profile-image",
  isLogin,
  upload.single("avatar"),
  changeProfile
);
export default router;
