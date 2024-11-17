const { GoogleGenerativeAI } = require("@google/generative-ai");
const api_key = "AIzaSyAVMzf2RvoQ27aTIGjAeZ-Tp-NC7O-N7iY"; 

const genAI = new GoogleGenerativeAI(api_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const prompt = "hi";

const generateData = async (prompt) => {
  let attempts = 0;
  const maxRetries = 5;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  while (attempts < maxRetries) {
    try {
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      return result.response.text();
    } catch (error) {
      if (error.status === 503) {
        console.log(`Service unavailable. Retrying (${attempts + 1}/${maxRetries})...`);
        attempts++;
        await delay(1000 * Math.pow(2, attempts)); // Exponential backoff
      } else {
        console.error("An error occurred:", error);
        return;
      }
    }
  }
  console.log("Failed after maximum retries. Please try again later.");
};

generateData();

module.exports={generateData}


