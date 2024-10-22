import { CodeEditorContext } from "@/context/CodeEditorContext";
import ICodeEditorContext from "@/interfaces/ICodeContext";
import { useContext } from "react";

const InputWindow: React.FC = () => {
    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { setStdinHandler, stdin } = codeEditorCtx!;
    return (
        <>
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-custom-black to-slate-700 mb-2">
                Input
            </h1>
            <textarea
                rows={5}
                value={stdin}
                onChange={(e) => setStdinHandler(e.target.value)}
                placeholder={`Custom input`}
                className="focus:outline-none w-full border-2 border-custom-black z-10 rounded-md px-4 py-2 bg-white mt-2"
            />
        </>
    );
};

export default InputWindow;