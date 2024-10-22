import { HttpStatusCode } from "axios";
import { openAiApiHandler } from "../config/openAI.util.js";
import Common from "../CONSTANTS/COMMON.js";
import supportedLanuages from "../CONSTANTS/supportedLanguages.js";

/**
 * @description This function is used to get the ai chat response from openai api
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} res
 */

const getAiChatResponse = async (req, res) => {

    //* get the messages from the request body
    const { messages } = req.body;

    //* check if the messages length is greater than 0 and not null
    if (messages && messages.length > 0) {
        //* create a message list with the system prompt
        const messageList = [{ role: "system", content: Common.SYSTEM_PROMPT }];
        //* push the messages to the message list
        for (const messageIndex in messages) {

            if (messages[messageIndex].isUser === true) {
                messageList.push({ role: "user", content: messages[messageIndex].text });
            } else {
                messageList.push({ role: "assistant", content: messages[messageIndex].text });
            }
        }

        openAiApiHandler(messageList).then((response) => {
            const responseFromServer = {
                currentTime: new Date().toISOString(),
                isUser: false,
                text: response.choices[0].message.content,
            }

            return res.status(HttpStatusCode.Created).send(responseFromServer);
        }
        ).catch((error) => {
            console.log(error);
            return res.status(HttpStatusCode.TooManyRequests).send({ message: error.error })
        });

    }
    else {
        return res.status(HttpStatusCode.BadRequest).send("Invalid Request");
    }

};

/**
 * @description This function is used to get the ai commentor response from openai api
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} res
 */
const getAICommentorRespose = async (req, res) => {
    //get the source code and language id from the request body 
    const { source_code, language_id } = req.body;
    //get the language name from the language id
    const language = supportedLanuages.filter((lang) => lang.id === language_id)[0].name;
    const prompt = `Please review the following ${language} code snippet and mark any errors you find using comments. Please do not send explanations, just mention the error in a comment.`;
    const messageList = [];
    messageList.push({ role: "system", content: prompt }, { role: "user", content: source_code });
    const responseFromOpenAi = await openAiApiHandler(messageList);
    const responseFromServer = responseFromOpenAi.choices[0].message.content;
    return res.status(HttpStatusCode.Created).send(responseFromServer);
}


export { getAiChatResponse, getAICommentorRespose };