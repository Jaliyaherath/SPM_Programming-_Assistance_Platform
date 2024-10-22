import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const PATHS = {
    COMPILER_POST_PATH: `${process.env.COMPILER_PATH}/submissions?base64_encoded=false&wait=false`,
    COMPILER_GET_PATH: `${process.env.COMPILER_PATH}/submissions`
}

export default PATHS;