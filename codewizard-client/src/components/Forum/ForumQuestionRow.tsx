import React, { useContext } from "react";
import { ForumContextType, Question } from "@/types/ForumTypes";
import { ForumContext } from "@/context/ForumProvider";
import { Avatar, Card } from "antd";
import { formatRelative } from "date-fns";
interface Params {
  question: Question;
}
const ForumQuestionRow = ({ question }: Params) => {
  const { setSelectedQuestionId } = useContext(
    ForumContext
  ) as ForumContextType;

  // const question = questions.find((q) => q.id === selectedQuestionId);
  return (
    <Card
      className="cursor-pointer hover:shadow-xl shadow-lg border-2border-gray-200"
      onClick={() => {
        setSelectedQuestionId(question._id);
      }}
      style={{}}
      bodyStyle={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "2rem",
        margin: "0rem",
        width: "100%",
        // background: "red",
        padding: "0.5rem",
      }}
    >
      <div className="flex flex-col">
        <div className="flex text-right gap-1 items-center justify-end">
          <p>{question.score}</p>
          <p>Votes</p>
        </div>
        <div className="flex text-right gap-1 items-center justify-end">
          <p>{question.answers.length}</p>
          <p>Answers</p>
        </div>
        <div className="flex text-right gap-1 items-center justify-end">
          <p>{question.views.length}</p>
          <p>Views</p>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-2xl underline  font-semibold">{question.title}</h3>
        <p className="line-clamp-2">{question.description}</p>
        <div className="flex justify-end">
          <div className="flex flex-col items-end">
            <span className="flex gap-2">
              <p className="inline-block font-semibold ">
                {question.author?.firstName} {question?.author?.lastName}
              </p>
              <Avatar
                className="mr-2"
                size="small"
                style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              >
                {question.author?.firstName?.slice(0, 1)}
                {question?.author?.lastName?.slice(0, 1)}
              </Avatar>
            </span>
            <p>
              <span className="text-gray-600">Asked</span>{" "}
              {formatRelative(new Date(question.createdAt), new Date())}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ForumQuestionRow;
