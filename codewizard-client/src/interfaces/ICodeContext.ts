import ICompileOutput from "./ICompileOutput";

export default interface ICodeEditorContext {
    sourceCode: string;
    isWaitingForReply: boolean;
    isCompiling: boolean;
    languageId: number;
    languageName: string;
    languageValue: string;
    theme: string;
    stdin: string;
    output: ICompileOutput | null;
    setLanguageHandler: (languageId: number) => void;
    setSourceCodeHandler: (sourceCode: string) => void;
    setThemeHandler: (isLight: boolean) => void;
    setStdinHandler: (stdin: string) => void;
    handleCompile: () => void;
    onAICommentorButtonClick: () => void;
}