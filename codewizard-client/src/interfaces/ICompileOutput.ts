export default interface ICompileOutput {
    stdout: string;
    time: string;
    memory: string;
    stderr: string;
    token: string;
    compile_output: string;
    message: string;
    status: {
        id: number;
        description: string
    }
}