import { GoogleGenerativeAI } from '@google/generative-ai';

export const callGeminiAPI = async (inputData) => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCGk-AUYYQQR_BTs__bpTvznHymyW5lfR0"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(inputData);
  console.log(result.response.text());
  return result
};
