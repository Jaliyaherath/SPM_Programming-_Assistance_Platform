/**
 * ConfirmModal dialog implementation
 */
import { useContext } from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
const { confirm } = Modal;
import { ExamsContext } from "@/app/context/ExamsContext";

export default function ConfirmModal({ examID }: { examID: any }) {
  const { deleteExam } = useContext(ExamsContext);
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled style={{ color: "#ff7875" }} />,
      content:
        "This action is permanant. Are you sure you want to delete this exam?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteExam(examID);
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
