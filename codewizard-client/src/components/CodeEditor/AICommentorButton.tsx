import { CodeEditorContext } from "@/context/CodeEditorContext";
import ICodeEditorContext from "@/interfaces/ICodeContext";
import { RobotOutlined } from "@ant-design/icons";
import { Button } from "antd/";
import { useContext } from "react";

const AICommentorButton: React.FC = () => {
    const codeEditorCtx = useContext<ICodeEditorContext | null>(CodeEditorContext);
    const { isWaitingForReply, onAICommentorButtonClick } = codeEditorCtx!;

    return (

        isWaitingForReply ? (<Button size="middle" className="w-36" type="primary" loading disabled>
            Looking for errors...
        </Button >) :
            (
                <Button
                    type="primary"
                    onClick={onAICommentorButtonClick}
                    className="h-full bg-[#FFAE00] w-fit"
                    icon={<RobotOutlined />}

                >
                    AI Commentor
                </Button>
            ))
}

export default AICommentorButton;