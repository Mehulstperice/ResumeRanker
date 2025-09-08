import User from "../models/User.js";
import bcrypt from "bcrypt";

// GET /auth/login
export const getLogin = (req, res) => {
  res.render("login", { error: null });
};

// POST /auth/login
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", { error: "Invalid email or password." });
  }

  req.session.userId = user._id;
  res.redirect("/resume/dashboard");
};

// GET /auth/signup
export const getSignup = (req, res) => {
  res.render("signup", { error: null });
};

// POST /auth/signup
export const postSignup = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.render("signup", { error: "Email already registered." });
  }

  const newUser = new User({ email, password });
  await newUser.save();

  req.session.userId = newUser._id;
  res.redirect("/resume/dashboard");
};

// GET /auth/logout
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
