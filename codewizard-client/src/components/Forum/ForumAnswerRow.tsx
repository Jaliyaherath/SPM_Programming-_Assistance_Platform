"use client";
import { Answer } from "@/types/ForumTypes";
import { formatRelative } from "date-fns";
import React from "react";
import DeleteAnswer from "./DeleteAnswer";
import UpdateAnswer from "./UpdateAnswer";
import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import VoteContainer from "./VoteContainer";
import { Avatar } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

interface Props {
  answer: Answer;
  questionId: string;
}

const ForumAnswerRow = ({ answer, questionId }: Props) => {
  const { data: session, status } = useSession();
  if (status === "loading" || !session?.user) return <>loading</>;

  return (
    <div
      className="flex gap-2 bg-white py-4 px-3 rounded-lg shadow-md"
      key={answer._id}
      data-color-mode="light"
    >
      <VoteContainer
        answerId={answer._id}
        votes={answer.votes}
        score={answer.score}
      />
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between">
          <div className="flex">
            <div>
              <div className="flex items-center">
                <Avatar
                  className="mr-2"
                  size="large"
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                >
                  {answer.author?.firstName.slice(0, 1)}
                  {answer?.author.lastName.slice(0, 1)}
                </Avatar>
                <div>
                  <p className="inline-block font-semibold">
                    {answer.author?.firstName} {answer?.author.lastName}
                  </p>
                  {answer.author?._id == session.user.id && (
                    <span className="text-gray-400"> (You)</span>
                  )}
                  <br />
                  Answered{" "}
                  {formatRelative(new Date(answer.createdAt), new Date())}
                </div>
              </div>
            </div>
          </div>
          {answer.author?._id == session.user.id.toString() &&
            !answer.markedAsSolution && (
              <div className="flex justify-end">
                <DeleteAnswer questionId={questionId} answerId={answer._id} />
                <UpdateAnswer questionId={questionId} answer={answer} />
              </div>
            )}
          {answer.markedAsSolution && (
            <span>
              <CheckCircleTwoTone
                twoToneColor="green"
                className="text-3xl"
                title="Marked As A Solution"
              />
            </span>
          )}
        </div>
        <MDEditor.Markdown
          className="code-color-change"
          source={answer.description}
        />
      </div>
    </div>
  );
};

export default ForumAnswerRow;
