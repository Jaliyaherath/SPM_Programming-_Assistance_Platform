import { Card } from "antd";
import React from "react";

const QuestionListView = ({
  title,
  data,
  commonValue,
  cName,
}: {
  title: string;
  data: any;
  commonValue: string;
  cName: string;
}) => {
  return (
    <Card
      title={title}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {data.map((question: any, index: number) => (
        <div key={question.id} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 w-20 h-16 text-center text-xl font-bold flex justify-center items-center">
              {index}
            </div>
            <div className="">
              <div className="">{question.question}</div>
              <div className="">{question.author}</div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center bg-green-100 p-2 w-20 h-16">
            <div className="text-xl font-bold">{question[commonValue]}</div>
            <div className="text-gray-600">{cName} </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default QuestionListView;
