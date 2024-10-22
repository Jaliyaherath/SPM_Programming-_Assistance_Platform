import LanguageDropdown from "./LanguageDropdown";
import ThemeDropDown from "./ThemeDropDown";
import CompileButton from "./CompileButton";
import OutputWindow from "./OutputWindow";
import InputWindow from "./InputWindows";
import CodeEditor from "./CodeEditor";
import CodeEditorContextProvider from "@/context/CodeEditorContext";
import AICommentorButton from "./AICommentorButton";

const CodeEditorWindow: React.FC = () => {
  return (
    <CodeEditorContextProvider>
      <div className="mx-auto">
        <div className="grid grid-row-3 grid-flow-col gap-4">
          <div className="row-span-2">
            <div className="grid grid-cols-4 gap-3 mb-5">
              <LanguageDropdown />
              <ThemeDropDown />
              <CompileButton />
              {/* <AICommentorButton /> */}
            </div>
            <CodeEditor />
          </div>
          <div className="row-span-1 col-span-10">
            <OutputWindow />
          </div>
          <div className="row-span-1 col-span-10">
            <InputWindow />
          </div>
        </div>
      </div>
    </CodeEditorContextProvider>
  );
};
export default CodeEditorWindow;
