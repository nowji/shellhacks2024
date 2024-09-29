// Gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export const callGeminiAPI = async (inputData, token) => {
  try {
    const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Make the API call with the token in the headers
    const result = await model.generateContent({
      prompt: JSON.stringify(inputData), // Pass inputData as a prompt
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Process the result as needed
    const responseText = result.response.text(); // Modify this based on the structure of the response
    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error("Error calling the Gemini API:", error);
  }
};



// import { GoogleGenerativeAI } from '@google/generative-ai';

// export const callGeminiAPI = async (inputData) => {
//   const genAI = new GoogleGenerativeAI(
//     "AIzaSyCGk-AUYYQQR_BTs__bpTvznHymyW5lfR0"
//   );
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//   const result = await model.generateContent(inputData);
//   console.log(result.response.text());
//   return result
// };
