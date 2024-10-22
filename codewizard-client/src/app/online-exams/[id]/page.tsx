"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import Card from "antd/es/card/Card";
import { ExamsContext } from "@/app/context/ExamsContext";
import { verifyPassword } from "../../utils/OnlineExamUtil";
import ExamTemplate from "@/components/exams-students/ExamTemplate";
import { useParams } from "next/navigation";

// export async function getStaticPaths() {
//   let examPaths = [];

//   try {
//     const res = await fetch("http://localhost:5000/api/v1/exams");

//     const data = await res.json();

//     const exams = await data.exams.filter((exam) => exam.isActive === true);

//     for (let exam of exams) {
//       examPaths.push({ params: { id: exam.id.toString() } });
//     }
//   } catch (err) {
//     console.log(err.message);
//   }

//   return {
//     paths: examPaths,
//     fallback: false, // can also be true or 'blocking'
//   };
// }

export default function StartExamPage() {
  const params = useParams();
  const { getExam } = useContext(ExamsContext);
  const [pwd, setPwd] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [actualPwd, setActualPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  // State variable to hold the exam questions
  const [examQuestions, setExamQuestions] = useState([]);

  // State variable to hold exam duartion in seconds
  const [durationSecs, setDurationSecs] = useState(0);

  let exam;

  useEffect(() => {
    async function fetchData() {
      exam = await getExam(params?.id);

      setTitle(exam.title);
      setDescription(exam.description);
      setActualPwd(exam.password);
      setExamQuestions(exam.questionsList);

      const totSecs =
        exam.duration.split(":")[0] * 3600 +
        exam.duration.split(":")[1] * 60 +
        exam.duration.split(":")[2] * 1;

      setDurationSecs(totSecs);
    }

    fetchData();
  }, []);

  if (validPwd === true) {
    return (
      <ExamTemplate examQuestions={examQuestions} examDuration={durationSecs} />
    );
  }

  return (
    <center
      style={{
        marginTop: "3%",
      }}
    >
      <Card
        hoverable
        title={title}
        bordered={false}
        style={{
          width: "50%",
        }}
      >
        <div style={{ textAlign: "left" }}>{description}</div> <br />
        <ol
          style={{
            fontWeight: "bold",
            color: "red",
            alignSelf: "start",
            listStyleType: "number",
            textAlign: "left",
          }}
        >
          Important !
          <li
            style={{
              fontWeight: "normal",
              color: "red",
            }}
          >
            There is only 1 attempt for the exam
          </li>
          <li
            style={{
              fontWeight: "normal",
              color: "red",
            }}
          >
            Do not refresh the browser as all your progress will be lost
          </li>
          <li
            style={{
              fontWeight: "normal",
              color: "red",
            }}
          >
            Your answers will be submitted automatically when the time exceeds
          </li>
        </ol>
        <br /> <br />
        <Input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <br />
        <br />
        <Button
          onClick={() => {
            if (actualPwd !== pwd) {
              alert("Password incorrect!");
            } else {
              setValidPwd(true);
            }
          }}
          ghost
          type="primary"
        >
          ATTEMPT
        </Button>
      </Card>
    </center>
  );
}
