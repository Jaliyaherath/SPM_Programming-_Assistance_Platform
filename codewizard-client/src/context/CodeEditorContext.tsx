import COMMON from "@/constants/common";
import PATHS from "@/constants/paths";
import supportedLanguages from "@/constants/supportedLanguages";
import IChildProps from "@/interfaces/IChildProps";
import ICodeEditorContext from "@/interfaces/ICodeContext";
import ICompileOutput from "@/interfaces/ICompileOutput";
import IReqBody from "@/interfaces/IReqBody";
import axios from "axios";
import { createContext, useState } from "react";

export const CodeEditorContext = createContext<ICodeEditorContext | null>(null);

const CodeEditorContextProvider = ({ children }: IChildProps) => {
    const [sourceCode, setSourceCode] = useState<string>("");
    const [languageId, setLanguageId] = useState<number>(COMMON.DEFAULT_LANGUAGE_ID);
    const [languageName, setLanguageName] = useState<string>(supportedLanguages.filter((language) => language.id === languageId)[0].name);
    const [languageValue, setLanguageValue] = useState<string>(supportedLanguages.filter((language) => language.id === languageId)[0].value);
    const [theme, setTheme] = useState<string>(COMMON.DEFAULT_THEME);
    const [stdin, setStdin] = useState<string>('');
    const [output, setOutput] = useState<ICompileOutput | null>(null);
    const [isCompiling, setIsCompiling] = useState<boolean>(false);
    const [isWaitingForReply, setIsWaitingForReply] = useState<boolean>(false);

    const setIsCompilingHandler = () => {
        setIsCompiling(prevState => !prevState);
    };

    //* set the language id
    const setLanguageHandler = (languageId: number) => {
        setLanguageName(supportedLanguages.filter((language) => language.id === languageId)[0].name);
        setLanguageValue(supportedLanguages.filter((language) => language.id === languageId)[0].value);
        setLanguageId(languageId);
    };

    //* set the source code
    const setSourceCodeHandler = (sourceCode: string) => {
        setSourceCode(sourceCode);
    };
    //* set the stdin
    const setStdinHandler = (stdin: string) => {
        setStdin(stdin);
    };

    //* set the theme
    const setThemeHandler = (isLight: boolean) => {
        isLight ? setTheme(COMMON.LIGHT_THEME) : setTheme(COMMON.DEFAULT_THEME);
    };

    //* handle the compile request
    const handleCompile = () => {
        //* check if the source code is not empty and language id is not null
        if (sourceCode.trim() !== '' && languageId !== null) {
            setIsCompilingHandler();
            //* set request body
            const bodyData: IReqBody = {
                source_code: sourceCode,
                language_id: languageId,
                stdin: stdin,
            }

            axios
                .post(
                    PATHS.COMPLILER_PATH,
                    bodyData
                )
                .then(async (res) => {
                    setOutput(res.data);
                    console.log(res.data);
                    setIsCompilingHandler();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const onAICommentorButtonClick = () => {
        if (sourceCode.trim() !== '' && languageId !== null) {
            setIsWaitingForReply(prevState => !prevState);
            //set request body
            const bodyData = {
                source_code: sourceCode,
                language_id: languageId,
            }

            axios
                .post(PATHS.AI_COMMENTOR_PATH,
                    { ...bodyData },
                )
                .then((res) => {
                    const sourceCode = res.data;
                    setSourceCode(sourceCode);
                    console.log(sourceCode);


                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    //* set the isWaitingForReply to false
                    setIsWaitingForReply(prevState => !prevState);
                });
        }
    }
    return (
        <CodeEditorContext.Provider value={{ sourceCode, isWaitingForReply, isCompiling, theme, languageValue, languageName, languageId, stdin, output, setSourceCodeHandler, setLanguageHandler, setStdinHandler, setThemeHandler, handleCompile, onAICommentorButtonClick }}>
            {children}
        </CodeEditorContext.Provider>
    )
};

export default CodeEditorContextProvider;
