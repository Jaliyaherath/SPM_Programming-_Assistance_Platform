// Function to verify password when attempting an exam
export function verifyPassword(actualPwd, enteredPassword) {
    return actualPwd === enteredPassword;
}

// Function to validate when adding questions
export function validateQuesForm(quesObjs) {
    const questionsArray = quesObjs.items;

    // Monitor form status
    let formStatus = true;

    for (const question of questionsArray) {
        if (question.hasOwnProperty("list") === false) {
            return false;
        }
    }

    return formStatus;
}
// Function to format the exam questions
export function formatQuestions(questionsList) {
    let choices = [];
    let correctAnswer;
    let question;
    let quizData = [];

    let tempChoices = [];

    for (const q of questionsList) {
        question = q.name;

        for (let choice of q.list) {
            // Store the choices of each question in "choices" array
            tempChoices.push(choice.option);

            if (choice.correctness === "true") {
                correctAnswer = choice.option;
            }
        }

        // Push the formatted question data to "quizData" array
        quizData.push({
            question,
            choices: choices.concat(tempChoices),
            correctAnswer
        })

        // Clear tempChoices;
        tempChoices = [];
    }

    // Return quizData
    return quizData;
}
