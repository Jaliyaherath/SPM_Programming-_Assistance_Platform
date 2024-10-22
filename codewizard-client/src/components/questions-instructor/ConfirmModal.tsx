/**
 * ConfirmModal dialog implementation
 */
import { useContext } from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
const { confirm } = Modal;
import { ExamsContext } from "@/app/context/ExamsContext";

export default function ConfirmModal({
  examID,
  questionID,
}: {
  examID: any;
  questionID: any;
}) {
  const { removeQuestion } = useContext(ExamsContext);

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you?",
      icon: <ExclamationCircleFilled style={{ color: "#ff7875" }} />,
      content:
        "This action is permanant. Are you sure you want to delete this question?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeQuestion(examID, questionID);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Button icon={<DeleteFilled />} ghost danger onClick={showDeleteConfirm}>
      Delete
    </Button>
  );
}
