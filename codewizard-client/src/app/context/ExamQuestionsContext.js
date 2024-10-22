"use client";

import { React, createContext, useState } from 'react';

export const ExamQuestionsContext = createContext();

export function ExamQuestionsProvider({ children }) {
    const [data, setData] = useState([]);

    /* Function to add new questions */
    const createQuestion = async (question) => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(question),
            });

            if (response.ok) {
                const data = await response.json();

                const newQuestion = data.questions;

                setData((prevData) => [...prevData, newQuestion]);

                alert("Question creation successful");
            }

        } catch (error) {
            console.log("Error : " + error.message);
        }
    };

    /* Function to get all questions */
    const getAllQuestions = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/questions");
            const data = await response.json();

            setData(data.questions);

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to get a particular question */
    const getQuestion = async (questionID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/questions/${questionID}`);
            const data = await response.json();

            return await data.questions[0];

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to update an exam */
    const updateQuestion = async (questionID, updatedQuestion) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/questions/${questionID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedQuestion),
            });

            const data = await response.json();

            setData((prevData) => {
                const index = prevData.findIndex((item) => item.id === questionID);
                if (index !== -1) {
                    prevData[index] = updatedQuestion;
                }
                return [...prevData];
            });
        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    /* Function to delete a question */
    const deleteQuestion = async (questionID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/questions/${questionID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            setData((prevData) => prevData.filter((item) => item.id !== questionID));

        } catch (error) {
            console.error("Error : " + error.message);
        }
    };

    return (
        <ExamQuestionsContext.Provider value={{ data, createQuestion, getAllQuestions, getQuestion, updateQuestion, deleteQuestion }}>
            {children}
        </ExamQuestionsContext.Provider>
    );
}
