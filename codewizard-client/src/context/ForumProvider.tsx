"use client";
import React, { createContext, useCallback, useEffect } from "react";
import { Answer, ForumContextType, Question } from "@/types/ForumTypes";
import { forumService } from "@/services";
import { useSession } from "next-auth/react";
import { App } from "antd";

const ForumContext = createContext<ForumContextType | null>(null);
const { Provider } = ForumContext;

const ForumProvider = ({ children }: { children: React.ReactNode }) => {
  const { message, notification } = App.useApp();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | undefined>();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = React.useState<
    string | undefined
  >();
  const [labId, setLabId] = React.useState<string | undefined>();
  const { data: session, status } = useSession();

  // const [ws, setWs] = React.useState<WebSocket | undefined>();
  //connect to websocket after labId is set
  useEffect(() => {
    if (session?.user.token === undefined) return;
    if (labId === undefined) return;
    const connectToWebsocket = () => {
      const ws = new WebSocket(
        `ws://localhost:5000/ws?token=${session?.user.token}`
      );
      // setWs(ws);
      ws.addEventListener("message", handleWsMessage);
      ws.addEventListener("close", () => {
        setTimeout(() => {
          console.log("Disconnected. Trying to reconnect.");
          connectToWebsocket();
        }, 1000);
      });
      ws.onerror = (error) => {
        console.log("WebSocket error " + error);
      };
    };
    const handleWsMessage = (event: MessageEvent) => {
      const message = event.data;
      if ("refresh_forum" == message) {
        fetchForumWithoutLoading();
      }
    };
    const fetchForumWithoutLoading = async () => {
      //fetch forum without loading state
      if (session?.user.token === undefined) return;
      if (labId === undefined) return;
      try {
        const response = await forumService(session?.user.token).getForum(
          labId
        );
        setQuestions(response);
        setError(undefined);
      } catch (err: any) {
        console.log(err.message);
        setError(err.message);
      }
    };
    connectToWebsocket();
  }, [session?.user.token, labId]);

  // fetch forum function

  // fetch forum on mount
  useEffect(() => {
    const fetchForum = async () => {
      if (status === "loading") return; // Do nothing while loading
      if (session?.user.token === undefined) return;
      if (labId === undefined) return;
      try {
        setIsLoading(true);
        const response = await forumService(session.user.token).getForum(labId);
        setQuestions(response);
        setIsLoading(false);
        setError(undefined);
      } catch (err: any) {
        console.log(err.message);
        setIsLoading(false);
        setError(err.message);
      }
    };
    fetchForum();
  }, [session, status, labId]);

  // add view when selectedQuestionId changes
  useEffect(() => {
    if (selectedQuestionId) {
      const addView = async () => {
        if (session?.user.token === undefined) return;

        // if question is already viewed by the user, don't add view
        const alreadyViewed = questions
          .find((question) => question._id === selectedQuestionId)
          ?.views?.includes(session?.user.id);

        if (alreadyViewed) return;

        try {
          await forumService(session.user.token).addView(selectedQuestionId);
        } catch (error) {
          console.log(error);
        }
      };
      addView();
    }
  }, [questions, selectedQuestionId, session?.user.id, session?.user.token]);

  const addQuestion = async (question: {
    title: string;
    description: string;
  }) => {
    if (session?.user.token === undefined) return;
    if (labId === undefined) return;
    try {
      setIsLoading(true);
      const response = await forumService(session.user.token).addQuestion(
        labId,
        question
      );
      setQuestions((prev) => [...prev, response]);
      setIsLoading(false);
      setError(undefined);
    } catch (err: any) {
      console.log(err.message);
      setIsLoading(false);
      setError(err.message);
    }
  };

  const postAnswer = async (
    questionId: string,
    answer: { description: string }
  ) => {
    if (session?.user.token === undefined) return;
    try {
      const response = await forumService(session.user.token).postAnswer(
        questionId,
        answer
      );
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === questionId) {
            return { ...question, answers: [...question.answers, response] };
          }
          return question;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteQuestion = async (questionId: string) => {
    if (session?.user.token === undefined) return;
    try {
      await forumService(session.user.token).deleteQuestion(questionId);
      setQuestions((prev) =>
        prev.filter((question) => question._id !== questionId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAnswer = async (questionId: string, answerId: string) => {
    if (session?.user.token === undefined) return;
    try {
      await forumService(session.user.token).deleteAnswer(questionId, answerId);
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === questionId) {
            return {
              ...question,
              answers: question.answers.filter(
                (answer) => answer._id !== answerId
              ),
            };
          }
          return question;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuestion = async (
    questionId: string,
    question: {
      title: string;
      description: string;
    }
  ) => {
    if (session?.user.token === undefined) return;
    try {
      const response = await forumService(session.user.token).updateQuestion(
        questionId,
        question
      );
      setQuestions((prev) =>
        prev.map((q) => {
          if (q._id === response._id) {
            return response;
          }
          return q;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateAnswer = async (
    questionId: string,
    answerId: string,
    answer: {
      description: string;
    }
  ) => {
    if (session?.user.token === undefined) return;
    try {
      const response = await forumService(session.user.token).updateAnswer(
        answerId,
        answer
      );
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === questionId) {
            return {
              ...question,
              answers: question.answers.map((a) => {
                if (a._id === response._id) {
                  return response;
                }
                return a;
              }),
            };
          }
          return question;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const approveAnswer = async (
    // questionId: string,
    answerId: string,
    markedAsSolution: boolean
  ) => {
    if (session?.user.token === undefined) return;
    try {
      const response = await forumService(session.user.token).approveAnswer(
        answerId,
        markedAsSolution
      );
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === selectedQuestionId) {
            return {
              ...question,
              answers: question.answers.map((a) => {
                if (a._id === response._id) {
                  return response;
                }
                return a;
              }),
            };
          }
          return question;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const voteQuestion = async (
    questionId: string,
    vote: "upvote" | "downvote" | "unvote"
  ) => {
    if (session?.user.token === undefined) return;
    try {
      setIsLoading(true);
      const response = await forumService(session.user.token).voteQuestion(
        questionId,
        vote
      );
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === questionId) {
            return response;
          }
          return question;
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Error");
      setIsLoading(false);
    }
  };

  const voteAnswer = async (
    answerId: string,
    vote: "upvote" | "downvote" | "unvote"
  ) => {
    if (session?.user.token === undefined) return;
    try {
      setIsLoading(true);
      const response = await forumService(session.user.token).voteAnswer(
        answerId,
        vote
      );
      setQuestions((prev) =>
        prev.map((question) => {
          if (question._id === selectedQuestionId) {
            return {
              ...question,
              answers: question.answers.map((answer) => {
                if (answer._id === answerId) {
                  return response;
                }
                return answer;
              }),
            };
          }
          return question;
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Error");
      setIsLoading(false);
    }
  };

  return (
    <Provider
      value={{
        isLoading,
        error,
        questions,
        selectedQuestionId,
        setSelectedQuestionId,
        setLabId,
        addQuestion,
        postAnswer,
        deleteQuestion,
        deleteAnswer,
        updateQuestion,
        updateAnswer,
        approveAnswer,
        voteQuestion,
        voteAnswer,
      }}
    >
      {children}
    </Provider>
  );
};

export { ForumProvider, ForumContext };
