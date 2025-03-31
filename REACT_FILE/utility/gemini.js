

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API });

async function main(input) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: input,
  });
  return response.text;
}

export default main;
