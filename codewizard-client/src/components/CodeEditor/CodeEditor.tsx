import { useContext, useEffect } from "react";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorContext } from "@/context/CodeEditorContext";
import ICodeEditorContext from "@/interfaces/ICodeContext";
import COMMON from "@/constants/common";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const CodeEditor: React.FC = () => {

    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { setSourceCodeHandler, languageValue, theme, sourceCode } = codeEditorCtx!;

    useEffect(() => { }, [sourceCode]);

  //* get current value of the editor
  function handleEditorChange(value: string | undefined, event: Object) {
    setSourceCodeHandler(value!);
  }

  function handleEditorDidMount(editor: Object, monaco: Monaco) {
    // console.log("onMount: the editor instance:", editor);
    // console.log("onMount: the monaco instance:", monaco);
  }

  //* Do something before the editor mounted
  function handleEditorWillMount(monaco: Monaco) {
    // console.log("beforeMount: the monaco instance:", monaco);
  }

  //* Do something when the editor has been mounted
  function handleEditorValidation(markers: Object) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

    return (
        <div className="">
            <Editor
                theme={theme}
                height={COMMON.EDITOR_HEIGHT}
                width={COMMON.EDITOR_WIDTH}
                defaultLanguage={languageValue}
                defaultValue={COMMON.DEFAULT_COMMENT}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                beforeMount={handleEditorWillMount}
                onValidate={handleEditorValidation}
                language={languageValue}
                value={sourceCode}
            />
        </div>
    );
};
export default CodeEditor;
