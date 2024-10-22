"use client";
import React, { useContext, useState } from "react";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import AddAnswer from "./AddAnswer";
import { useSession } from "next-auth/react";
import DeleteQuestion from "./DeleteQuestion";
import UpdateQuestion from "./UpdateQuestion";
import MDEditor from "@uiw/react-md-editor";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Avatar, Button, Divider, Radio } from "antd";
import { formatRelative } from "date-fns";
import VoteContainer from "./VoteContainer";
import ForumAnswerRow from "./ForumAnswerRow";

const QuestionView = () => {
  const [isFilterByVotes, setIsFilterByVotes] = useState(true);
  const {
    questions,
    selectedQuestionId,
    setSelectedQuestionId,
    deleteQuestion,
  } = useContext(ForumContext) as ForumContextType;

  const { data: session, status } = useSession();

  if (!selectedQuestionId || !questions) {
    return <div></div>;
  }
  const question = questions.find((q) => q._id === selectedQuestionId);
  if (!selectedQuestionId || !question) {
    return <div>not selected</div>;
  }

  if (status === "loading" || !session?.user) return <>loading</>;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <div
          onClick={() => {
            setSelectedQuestionId(undefined);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Button
            type="text"
            shape="circle"
            icon={<ArrowLeftOutlined />}
            title="Back to questions"
          />
          <p className="text-xl font-medium ml-2">Back to questions</p>
        </div>
      </div>
      <div className="bg-white py-4 px-2 rounded-lg shadow-md flex gap-4 flex-col">
        <div className="flex gap-4 w-full">
          <VoteContainer
            score={question.score}
            votes={question.votes}
            questionId={question._id}
          />
          <div className="flex flex-col w-full h-full gap-2 ">
            <h3 className="text-2xl font-semibold underline">
              {question.title}
            </h3>
            <Divider className="my-0 border-gray-300" />
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div>
                  {/* <span className="text-gray-600">Asked by:</span>{" "} */}
                  <Avatar
                    className="mr-2"
                    size="large"
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    {question.author?.firstName.slice(0, 1)}
                    {question?.author?.lastName.slice(0, 1)}
                  </Avatar>
                  <p className="inline-block font-semibold text-lg">
                    {question.author?.firstName} {question?.author.lastName}
                  </p>
                  {question.author?._id == session.user.id && (
                    <span className="text-gray-400"> (You)</span>
                  )}
                </div>
                {question.author._id == session.user.id && (
                  <div className="flex gap-2">
                    <DeleteQuestion questionId={question._id} />
                    <UpdateQuestion question={question} />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <p>
                  <span className="text-gray-600">Asked</span>{" "}
                  {formatRelative(new Date(question.createdAt), new Date())}
                </p>
                <p>
                  <span className="text-gray-600">Modified</span>{" "}
                  {formatRelative(new Date(question.updatedAt), new Date())}
                </p>
                <p>
                  <span className="text-gray-600">Views</span>{" "}
                  {question.views.length}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Divider className="my-0 border-gray-300" />

        <div data-color-mode="light">
          <MDEditor.Markdown
            className="code-color-change"
            source={question.description}
            style={{
              padding: "0.5rem",
            }}
          />
        </div>
      </div>
      {question.answers.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h4 className="text-2xl font-bold inline-block">
              Answers ({question.answers.length})
            </h4>
            <Radio.Group
              options={[
                { label: "Sort by votes", value: true },
                { label: "Sort by date", value: false },
              ]}
              onChange={(e) => setIsFilterByVotes(e.target.value)}
              value={isFilterByVotes}
              defaultValue={true}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
          <div className="flex flex-col gap-4">
            {question.answers
              .sort((a, b) => {
                if (isFilterByVotes) {
                  return b.score - a.score;
                } else {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                }
              })
              .map((answer) => (
                <ForumAnswerRow
                  key={answer._id}
                  answer={answer}
                  questionId={question._id}
                />
              ))}
          </div>
        </div>
      )}

      <AddAnswer questionId={question._id} />
    </div>
  );
};

export default QuestionView;
