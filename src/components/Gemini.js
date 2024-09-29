import { GoogleGenerativeAI } from '@google/generative-ai';

const cleanApiResponse = (apiResponse) => {
  let cleanedResponse = apiResponse.replace(/`+/g, ''); // Remove all backticks
  while (cleanedResponse[0] !== '{') {
    cleanedResponse = cleanedResponse.substring(1); // Remove the first character
  }

  return cleanedResponse;
};


export const callGeminiAPI = async (inputData) => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCGk-AUYYQQR_BTs__bpTvznHymyW5lfR0"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  let result = await model.generateContent(inputData);
  console.log(result.response.text());
  let cleanResponse = cleanApiResponse(result.response.text());
  console.log(cleanResponse);
  console.log(JSON.parse(cleanResponse));

  return JSON.parse(cleanResponse);
};
