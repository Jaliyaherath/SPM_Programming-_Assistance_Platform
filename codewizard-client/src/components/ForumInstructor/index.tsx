"use client";
import React, { useContext } from "react";
import QuestionList from "@/components/Forum/QuestionList";
import QuestionView from "@/components/ForumInstructor/QuestionView";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";

const ForumInstructor = ({ labId }: { labId: string }) => {
  const { questions, selectedQuestionId, setLabId, isLoading, error } =
    useContext(ForumContext) as ForumContextType;

  React.useEffect(() => {
    setLabId(labId);
  }, [labId, setLabId]);

  if (isLoading && questions.length < 1) return <div>loading</div>;
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

export default ForumInstructor;
