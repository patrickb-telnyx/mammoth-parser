import express from "express";
import multer from "multer";
import mammoth from "mammoth";

const app = express();
const upload = multer();

app.post("/convert", upload.single("file"), async (req, res) => {
  try {
    const result = await mammoth.extractRawText({ buffer: req.file.buffer });
    res.json({ text: result.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
