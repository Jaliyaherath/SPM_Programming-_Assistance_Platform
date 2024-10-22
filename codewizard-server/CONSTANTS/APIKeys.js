import dotenv from 'dotenv';
import process from 'process';
dotenv.config();
//* APIKEYS of all the APIs used in the project
const APIKEYS = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
export default APIKEYS;