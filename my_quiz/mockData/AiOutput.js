const examName = "UPSC"
const subject = "economics"
const numberOfOptions = "4"

const AiInput = `provide me ${examName} ${subject} mcq questions with ${numberOfOptions} options  and correct ans among them, in proper format`
const AIOutput = "Here are more UPSC Economics-related multiple-choice questions (MCQs) in a structured format:\n\n---\n\n### 1. **What is the primary objective of the Fiscal Responsibility and Budget Management (FRBM) Act?**\n\n   a) To control inflation  \n   b) To regulate foreign exchange reserves  \n   c) To ensure fiscal discipline by controlling the fiscal deficit  \n   d) To promote exports\n\n   **Correct Answer: c) To ensure fiscal discipline by controlling the fiscal deficit**\n\n---\n\n### 2. **Which of the following is a feature of a recessionary economy?**\n\n   a) Increasing inflation  \n   b) High unemployment  \n   c) Rising GDP growth  \n   d) Expanding industrial production\n\n   **Correct Answer: b) High unemployment**\n\n---\n\n### 3. **What is the 'balance of payments'?**\n\n   a) The difference between exports and imports of goods  \n   b) A statement that records all economic transactions between residents of a country and the rest of the world  \n   c) The total trade deficit  \n   d) The account balance of a nation’s international investments\n\n   **Correct Answer: b) A statement that records all economic transactions between residents of a country and the rest of the world**\n\n---\n\n### 4. **Which among the following is the largest contributor to India's Gross Domestic Product (GDP)?**\n\n   a) Agriculture  \n   b) Industry  \n   c) Services  \n   d) Manufacturing\n\n   **Correct Answer: c) Services**\n\n---\n\n### 5. **In which year was the Goods and Services Tax (GST) introduced in India?**\n\n   a) 2014  \n   b) 2015  \n   c) 2016  \n   d) 2017\n\n   **Correct Answer: d) 2017**\n\n---\n\n### 6. **What is the term 'Capital Gains Tax' associated with?**\n\n   a) Tax on income from salaries  \n   b) Tax on profits from the sale of assets  \n   c) Tax on goods and services  \n   d) Tax on imported goods\n\n   **Correct Answer: b) Tax on profits from the sale of assets**\n\n---\n\n### 7. **What does 'Repo Rate' mean in the context of the Indian economy?**\n\n   a) The rate at which the government borrows from the RBI  \n   b) The rate at which the RBI borrows from commercial banks  \n   c) The rate at which the RBI lends to commercial banks  \n   d) The rate at which commercial banks lend to each other\n\n   **Correct Answer: c) The rate at which the RBI lends to commercial banks**\n\n---\n\n### 8. **What does the 'Gini Coefficient' measure?**\n\n   a) The level of inflation in the economy  \n   b) The rate of unemployment  \n   c) The degree of income inequality in a population  \n   d) The growth rate of a country's economy\n\n   **Correct Answer: c) The degree of income inequality in a population**\n\n---\n\n### 9. **What is the main function of the Securities and Exchange Board of India (SEBI)?**\n\n   a) To promote trade and investment in India  \n   b) To regulate the stock markets in India  \n   c) To control the country's foreign exchange reserves  \n   d) To implement monetary policy\n\n   **Correct Answer: b) To regulate the stock markets in India**\n\n---\n\n### 10. **Which of the following defines 'Inflation'?**\n\n   a) A general increase in prices over time  \n   b) A decrease in prices of essential goods  \n   c) Stability in the cost of living  \n   d) A fall in the purchasing power of the currency\n\n   **Correct Answer: a) A general increase in prices over time**\n\n---\n\nFeel free to let me know if you would like more questions or any specific topics in Economics!";

// Process the string into an array of question objects
const questionsArray = AIOutput.split('---').map(block => {
  const questionMatch = block.match(/### \d+\.\s\*\*(.*?)\*\*/s);
  const question = questionMatch ? questionMatch[1].trim() : null;
  
  const optionsMatch = block.match(/a\)\s(.*?)\s+b\)\s(.*?)\s+c\)\s(.*?)\s+d\)\s(.*?)\n/s);
  const options = optionsMatch ? [
    optionsMatch[1].trim(),
    optionsMatch[2].trim(),
    optionsMatch[3].trim(),
    optionsMatch[4].trim()
  ] : [];
  
  const correctAnswerMatch = block.match(/\*\*Correct Answer:\s[a-d]\)\s(.*?)\*\*/);
  const correctAnswer = correctAnswerMatch ? correctAnswerMatch[1].trim() : null;
  
  return question && options.length === 4 && correctAnswer
    ? {
        question,
        optionA: options[0],
        optionB: options[1],
        optionC: options[2],
        optionD: options[3],
        answer: correctAnswer
      }
    : null;
}).filter(Boolean);

const quizObject = {
  _id: { $oid: "662c1016183253fbfd20dd4a" },
  testName: examName,
  subject: subject,
  __v: { $numberInt: "0" },
  question: questionsArray,
  testTime: { $numberInt: "2" }
};

console.log(JSON.stringify(quizObject, null, 2));
