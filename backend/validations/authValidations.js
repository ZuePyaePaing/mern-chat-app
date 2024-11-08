import { body } from "express-validator";

// register validation
export const registerValidaton = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters logn"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at last 6 characters long"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

// login validaton
export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at last 6 characters long"),
];

export const resetPasswordValidation = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at last 6 characters logn"),
];

export const changePasswordValidation = [
  body("currentPassword")
    .trim()
    .notEmpty()
    .withMessage("Current Passwrod is required")
    .isLength({ min: 6 })
    .withMessage("Current Password must be at last 6 chatacters logn"),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("Current Passwrod is required")
    .isLength({ min: 6 })
    .withMessage("Current Password must be at last 6 chatacters logn"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Current Passwrod is required")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Password do not match"),
];

export const changeNameValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters logn"),
];
