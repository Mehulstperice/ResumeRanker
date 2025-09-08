import express from "express";
import {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  logout
} from "../controllers/authController.js";

const router = express.Router();

// Login Routes
router.get("/login", getLogin);
router.post("/login", postLogin);

// Signup Routes
router.get("/signup", getSignup);
router.post("/signup", postSignup);

// Logout Route
router.get("/logout", logout);

export default router;
