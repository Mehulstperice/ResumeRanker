import express from "express";
import multer from "multer";
import {
  getDashboard,
  postUpload,
  getResult,
  downloadPDF
} from "../controllers/resumeController.js";

const upload = multer();

const router = express.Router();

router.get("/dashboard", getDashboard);
router.post("/upload", upload.single("resume"), postUpload);
router.get("/result/:id", getResult);
router.get("/download/:id", downloadPDF);

export default router;