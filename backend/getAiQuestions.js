const { generateData } = require("./gemini");

const getAiQuestions = async (examname, sub, noOfQues, time) => {
    const examName = examname || "UPSC";
    const subject = sub || "history";
    const numberOfOptions = noOfQues || "4";

    const AiInput = `provide me ${examName} ${subject} mcq questions with ${numberOfOptions} options and correct answer among them, in proper format with proper naming like for question it should name as question 1 and option a and for answer it should be answer as a object format, number of question will be ${numberOfOptions}, don't need explanation just answer as correct answer, please give out just json object nothing else`;
    const AIOutput = await generateData(AiInput);

    // Clean AIOutput to remove unwanted prefix/suffix if present
    const cleanedOutput = AIOutput.replace(/^[^{]*{|}[^}]*$/g, '');

    let parsedData;
    try {
        // Ensure JSON format by parsing
        parsedData = JSON.parse(`{${cleanedOutput}}`);
    } catch (error) {
        console.error("Failed to parse AIOutput as JSON:", error);
        return;
    }

    const processQuestions = (data) => {
        return data.questions.map((item) => {
            const questionKey = Object.keys(item)[0];
            const options = item.options;
            const correctAnswerKey = item.answer;
        
            return {
                question: item[questionKey],
                optionA: options.a,
                optionB: options.b,
                optionC: options.c,
                optionD: options.d,
                answer: options[correctAnswerKey]
            };
        });
    };

    const formattedQuestions = await processQuestions(parsedData);

    const quizObject = {
        _id: "662c1016183253fbfd20dd4a",
        testName: examName,
        subject: subject,
        __v: { $numberInt: "0" },
        question: formattedQuestions,
        testTime: Number(time),
    };

    console.log(JSON.stringify(quizObject, null, 2));
    return quizObject;
};

module.exports = { getAiQuestions };
