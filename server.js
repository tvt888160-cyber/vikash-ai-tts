import express from "express";
import OpenAI from "openai";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/tts", async (req, res) => {
  const { text, voice } = req.body;

  const response = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: voice || "alloy",
    input: text
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync("public/output.mp3", buffer);

  res.json({ file: "output.mp3" });
});

app.listen(3000);
