import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  content: String,
  score: Number,
  missingSkills: [String]
});

export default mongoose.model("Resume", resumeSchema);