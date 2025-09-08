import PDFDocument from "pdfkit";

export const generatePDF = (resume) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(18).text("Resume Match Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text("File: " + resume.filename);
    doc.text("Score: " + resume.score + "%");
    doc.text("Missing Skills: " + resume.missingSkills.join(", ") || "None");

    doc.end();
  });
};