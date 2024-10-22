"use client";
import React, { useContext } from "react";
import ForumQuestionCol from "./ForumQuestionRow";
import QuestionList from "./QuestionList";
import QuestionView from "./QuestionView";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";

const ForumMain = ({ labId }: { labId: string }) => {
  const { questions, selectedQuestionId, setLabId, isLoading, error } =
    useContext(ForumContext) as ForumContextType;

  React.useEffect(() => {
    setLabId(labId);
  }, [labId, setLabId]);

  if (isLoading && questions.length == 0) return <div>loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className="flex flex-col m-2 ">
      {selectedQuestionId ? (
        <QuestionView />
      ) : (
        <QuestionList questions={questions} />
      )}
    </div>
  );
};

export default ForumMain;
