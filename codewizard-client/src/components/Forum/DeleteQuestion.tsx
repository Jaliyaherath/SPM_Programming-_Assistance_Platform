"use client";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useContext, useState } from "react";

const DeleteQuestion = ({ questionId }: { questionId: string }) => {
  const { deleteQuestion, setSelectedQuestionId } = useContext(
    ForumContext
  ) as ForumContextType;
  const { confirm } = Modal;
  function showConfirm() {
    confirm({
      title: "Do you want to delete question?",

      async onOk() {
        try {
          await deleteQuestion(questionId);
          setSelectedQuestionId(undefined);
        } catch (e) {
          return console.log("Oops errors!");
        }
      },
      onCancel() {},
    });
  }
  return (
    <Button
      type="text"
      shape="circle"
      onClick={showConfirm}
      icon={<DeleteFilled className=" hover:text-red-500 text-xl" />}
    />
  );
};

export default DeleteQuestion;
