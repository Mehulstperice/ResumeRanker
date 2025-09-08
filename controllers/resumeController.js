import Resume from "../models/Resume.js";
import { extractKeywordsAndScore } from "../utils/nlpProcessor.js";
import { generatePDF } from "../utils/pdfGenerator.js";
import fs from "fs";

export const getDashboard = async (req, res) => {
  const resumes = await Resume.find({ user: req.session.userId });
  res.render("dashboard", { resumes });
};

export const postUpload = async (req, res) => {
  const { jobDesc } = req.body;
  const resumeText = req.file.buffer.toString("utf-8");

  const { score, missing } = extractKeywordsAndScore(jobDesc, resumeText);

  const resume = await Resume.create({
    user: req.session.userId,
    filename: req.file.originalname,
    score,
    missingSkills: missing,
    content: resumeText,
  });

  res.redirect(`/resume/result/${resume._id}`);
};

export const getResult = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  res.render("result", { resume });
};

export const downloadPDF = async (req, res) => {
  const resume = await Resume.findById(req.params.id);
  const pdfBuffer = await generatePDF(resume);
  res.setHeader("Content-Disposition", `attachment; filename="${resume.filename}.pdf"`);
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdfBuffer);
};