"use client";
import { CodeEditorContext } from "@/context/CodeEditorContext";
import ICodeEditorContext from "@/interfaces/ICodeContext";
import { Button } from "antd";
import { useContext } from "react";

const CompileButton: React.FC = () => {
  const codeEditorCtx = useContext<ICodeEditorContext | null>(
    CodeEditorContext
  );
  const { handleCompile, isCompiling } = codeEditorCtx!;
  return (
    <>
      {isCompiling ? (
        <Button size="middle" className="w-36" type="primary" loading disabled>
          Compiling
        </Button>
      ) : (
        <Button
          type="primary"
          size="middle"
          onClick={handleCompile}
          className="w-36 bg-[#FFAE00]"
        >
          Compile
        </Button>
      )}
    </>
  );
};

export default CompileButton;
