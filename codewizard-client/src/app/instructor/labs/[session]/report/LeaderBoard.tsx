import { Card, Divider } from "antd";
import React from "react";

const LeaderBoard = ({ data }: { data: any }) => {
  return (
    <Card title="Leaderboard">
      {data?.map((student: any, index: number) => {
        return (
          <>
            <div
              key={student.studentId}
              className="mb-2 flex justify-between items-center"
            >
              <div className="flex gap-2 items-center">
                <p className="text-3xl font-medium p-5 bg-yellow-200">
                  {index + 1}
                </p>
                <div className="">
                  <p className="text-xl font-medium">
                    {student.studentId} - {student.name}
                  </p>
                  <p className="text-gray-500">
                    Questions asked: {student.questions} | Answers given:{" "}
                    {student.answers} | Votes given: {student.votesGiven} | Up
                    votes received: {student.upvotesReceived} | No of question
                    viewed: {student.views} | Provided Solutions:{" "}
                    {student.solutions}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-5 bg-green-100">
                <p className="text-3xl font-medium">{student.score}</p>
                <p className="text-gray-500">points</p>
              </div>
            </div>
            <Divider />
          </>
        );
      })}
    </Card>
  );
};

export default LeaderBoard;
