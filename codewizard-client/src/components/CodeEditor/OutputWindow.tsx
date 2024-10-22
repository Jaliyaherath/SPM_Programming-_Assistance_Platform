'use client'
import { useContext, useState, useEffect } from 'react';
import { CodeEditorContext } from "@/context/CodeEditorContext";
import ICodeEditorContext from "@/interfaces/ICodeContext";

const OutputWindow = () => {
    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { output } = codeEditorCtx!;

    const [consoleOutput, setConsoleOutput] = useState<JSX.Element | null>(null);

    const compilerStatus = output?.status.id;
    useEffect(() => {
        if (output !== null) {
            switch (compilerStatus) {
                case 6:
                    setConsoleOutput(
                        <pre className="px-2 py-1 font-normal text-xs text-red-500">
                            {atob(output.compile_output) !== null ? atob(output.compile_output) : "null"}
                        </pre>
                    );
                    break;
                case 3:
                    setConsoleOutput(
                        <pre className="px-2 py-1 font-normal text-xs text-green-500">
                            {atob(output.stdout) !== null ? `${atob(output.stdout)}` : null}
                        </pre>
                    );
                    break;
                case 5:
                    setConsoleOutput(
                        <pre className="px-2 py-1 font-normal text-xs text-red-500">
                            {`Time Limit Exceeded`}
                        </pre>
                    );
                    break;
                default:
                    setConsoleOutput(<pre className="px-2 py-1 font-normal text-xs text-red-500">
                        {atob(output.stderr) !== null ? atob(output.stderr) : null}
                    </pre>
                    );
                    break;
            }
        }
    }, [output, compilerStatus]);

    return (
        <>
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-custom-black to-custom-blue-unkown mb-2">
                Output
            </h1>
            <div className="w-full h-56 bg-custom-black rounded-md text-custom-light-gray font-normal text-base overflow-y-auto p-4 ">
                {consoleOutput ? <>{consoleOutput}</> : null}
            </div>
        </>
    );
};

export default OutputWindow;