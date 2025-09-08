import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "resume_ranker_secret_key",
    resave: false,
    saveUninitialized: false
  })
);

// Make session userId available to views
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

// View Engine
app.set("view engine", "ejs");

// Routes
app.use("/auth", authRoutes);
app.use("/resume", resumeRoutes);

// Redirect to login or dashboard
app.get("/", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/resume/dashboard");
  }
  res.redirect("/auth/signup");
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
