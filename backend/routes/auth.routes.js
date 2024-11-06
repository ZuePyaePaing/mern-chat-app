import { Router } from "express";

import {register,login} from "../controllers/auth.controllers.js";

const router = Router();

// POST /retister
router.post("/register", register);

// POST /login
router.post("/login", login);

export default router;
