"use client";
// src/components/Quiz.js
import React, { useState, useEffect, useContext } from "react";
import { formatQuestions } from "@/app/utils/OnlineExamUtil";
import ExamSubmitModal from "./ExamSubmitModal";
import { Alert, Button, List, Spin } from "antd";
import { ExamsContext } from "@/app/context/ExamsContext";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function ExamTemplate({
  examQuestions,
  examDuration,
}: {
  examQuestions: any;
  examDuration: any;
}) {
  // State variable to hold data of the particular exam
  const [examData, setExamData] = useState<any>("");

  useEffect(() => {
    async function fetchExamData() {
      const data = await getExam(params?.id);

      setExamData(data);
    }

    fetchExamData();
  }, []);
  // Function to insert result
  const { data: session, status } = useSession();
  const params = useParams();

  const { getExam } = useContext(ExamsContext);

  async function insertResult() {
    try {
      const res = await fetch("http://localhost:5000/api/v1/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          examID: params?.id,
          // studentID: 12,
          questionsAttempted: userAnswers.length,
          marks: score,
          status:
            score >= Math.floor(examData.noOfQuestions / 2) ? "Pass" : "Fail",
        }),
      });

      if (res.ok) {
        // window.location.replace("/online-exams");
        router.push("/online-exams");
      } else {
        alert("There was an error");
      }
    } catch (error: any) {
      console.log("Error : " + error.message);
    }
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(examDuration); // 5-minute timer in seconds

  const router = useRouter();

  // Invoke formatQuestions function
  const quizData = formatQuestions(examQuestions);

  console.log(quizData);
  const [userAnswers, setUserAnswers] = useState(
    new Array(quizData.length).fill(null)
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null); // Track selected choice

  // Function to handle user's answer selection
  const handleAnswerSelect = (selectedAnswer: any) => {
    setSelectedChoice(selectedAnswer);
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      return newAnswers;
    });
  };

  // Function to move to the next question
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(userAnswers[currentQuestionIndex + 1]);
    } else {
      setQuizCompleted(true);
    }
  };

  const moveToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedChoice(userAnswers[currentQuestionIndex - 1]);
    }
  };

  // Function to calculate the score
  const calculateScore = () => {
    console.log("FINISH CLICKED");

    let correctAnswers = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (userAnswers[i] == quizData[i].correctAnswer) {
        correctAnswers += examData.passMark / examData.noOfQuestions;
      }
    }
    setScore(correctAnswers);

    setQuizCompleted(true);
  };

  // Function to format time as "mm:ss"
  const formatTime = (seconds: any) => {
    const hrs = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hrs < 10 ? "0" : ""}${hrs}:${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0 && !quizCompleted) {
        setTime(time - 1);
      } else {
        clearInterval(timer);
        if (!quizCompleted) {
          calculateScore(); // Calculate the score if time runs out
          setQuizCompleted(true); // Finish the quiz if time runs out
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time, quizCompleted]);

  useEffect(() => {
    if (quizCompleted) {
      insertResult();
    }
  }, [quizCompleted]);

  if (quizCompleted) {
    return (
      // <center>
      //   <div className="quiz" style={{ marginTop: "50px" }}>
      //     <h1 style={{ color: "red" }}>DON'T CLOSE THIS WINDOW</h1> <br />
      //     <p>
      //       Exam completed. Your response has been recorded.
      //       {/* Your Score: {score}/{quizData.length} */}
      //     </p>{" "}
      //     <br />
      //     <p>Redirecting to homepage...</p>
      //   </div>
      // </center>

      <Spin spinning={true}>
        <center>
          <Alert
            style={{ marginTop: "50px", width: "fit-content" }}
            message="Exam Completed"
            description="Please do not close the window. Redirecting..."
            type="warning"
          />
        </center>
      </Spin>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz" style={{ marginTop: "50px" }}>
      {/* <h1>Quiz App</h1> */}
      <div
        className="timer"
        style={{
          marginLeft: "50px",
          marginRight: "50px",
          border: "1px solid #faad14",
          background: "#faad14",
          borderRadius: "15px",
          padding: "10px",
          color: "white",
          textAlign: "center",
        }}
      >
        Time Remaining: {formatTime(time)}
      </div>{" "}
      <br />
      <div
        style={{
          marginLeft: "50px",
          padding: "20px",
          // maxWidth: "50px",
          border: "1px solid #faad14",
          borderRadius: "10px",
          maxWidth: "900px",
        }}
      >
        <h2>
          {"(Q" + (currentQuestionIndex + 1) + ") " + currentQuestion.question}
        </h2>
        <ul>
          <br />
          {currentQuestion.choices.map((choice, index) => (
            <>
              <List.Item key={index} style={{ gap: "10px", display: "flex" }}>
                <input
                  type="radio"
                  id={`choice-${index}`}
                  name="choices"
                  value={choice}
                  onChange={() => handleAnswerSelect(choice)}
                  checked={selectedChoice === choice}
                />
                <label htmlFor={`choice-${index}`}>{choice}</label>
              </List.Item>
            </>
          ))}
        </ul>
      </div>{" "}
      <br />
      <br />
      <Button
        onClick={moveToPreviousQuestion}
        disabled={currentQuestionIndex === 0}
        style={{
          marginLeft: "50px",
          float: "left",
        }}
        ghost
        type="primary"
      >
        Previous
      </Button>
      {currentQuestionIndex < quizData.length - 1 ? (
        <Button
          onClick={moveToNextQuestion}
          style={{
            marginRight: "50px",
            float: "right",
          }}
          ghost
          type="primary"
        >
          Next
        </Button>
      ) : (
        <>
          <Button
            onClick={calculateScore}
            style={{
              marginRight: "50px",
              float: "right",
            }}
            ghost
            type="primary"
          >
            Finish
          </Button>
        </>
      )}
    </div>
  );
}

export default ExamTemplate;
