import axios, { HttpStatusCode } from "axios";
import PATHS from "../CONSTANTS/Paths.js";

/**
 * @description This function is used to get the compiled output from Judge0 API and send it to the client
 * @param {Request} req
 * @param {Response} res
 */
const getCompiledOutput = async (req, res) => {
    const { source_code, language_id, stdin } = req.body;

    try {
        // Post request to Judge0 API to get the token
        const response = await axios.post(PATHS.COMPILER_POST_PATH, {
            source_code,
            language_id,
            stdin
        }, {
            headers: {
                'X-RapidAPI-Key': '5c0cb27b11mshd143ab3c55bf35cp1feaa2jsna4d3c6831f93',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        });

        const token = response.data.token;

        // Wait for a short period before getting the result
        setTimeout(async () => {
            // Get request to Judge0 API to get the compiled output
            const result = await axios.get(`${PATHS.COMPILER_GET_PATH}/${token}?base64_encoded=true`, {
                headers: {
                    'X-RapidAPI-Key': '5c0cb27b11mshd143ab3c55bf35cp1feaa2jsna4d3c6831f93',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            });

            // Send the compiled output to the client
            res.status(HttpStatusCode.Created).send(result.data);
        }, 2000);
    } catch (err) {
        if (err instanceof Error) {
            console.log(err);
            res.status(HttpStatusCode.InternalServerError).send(err.message);
        } else {
            res.status(HttpStatusCode.InternalServerError).send(`An unknown error occurred: ${err}`);
        }
    }
};

export { getCompiledOutput };
