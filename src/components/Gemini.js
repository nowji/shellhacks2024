import { GoogleGenerativeAI } from '@google/generative-ai';

const cleanApiResponse = (apiResponse) => {
  const cleanedResponse = apiResponse.replace(/`+/g, ''); // Remove all backticks
  return cleanedResponse;
};


export const callGeminiAPI = async (inputData) => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCGk-AUYYQQR_BTs__bpTvznHymyW5lfR0"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(inputData);
  console.log(result.response.text());
  const cleanResponse = cleanApiResponse(result.response.text());
  console.log(cleanResponse);
  console.log(JSON.parse(cleanResponse));

  return JSON.parse(cleanResponse);
};
