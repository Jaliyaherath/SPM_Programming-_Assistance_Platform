import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType, Vote } from "@/types/ForumTypes";
import { DislikeTwoTone, LikeTwoTone } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

interface Props {
  score: number;
  votes: Vote[];
  questionId?: string;
  answerId?: string;
}

const VoteContainer = ({ score, votes, questionId, answerId }: Props) => {
  const { voteQuestion, voteAnswer, isLoading } = useContext(
    ForumContext
  ) as ForumContextType;
  const { data: session, status } = useSession();
  if (status === "loading" || !session?.user) return <>loading</>;

  const vote = votes.find((v) => v.user === session?.user?.id)?.vote;
  return (
    <div className="flex flex-col items-center gap-1 text-xl">
      <Button
        type="text"
        shape="circle"
        onClick={() => {
          if (questionId) {
            if (vote === 1) {
              voteQuestion(questionId, "unvote");
            } else {
              voteQuestion(questionId, "upvote");
            }
          } else if (answerId) {
            if (vote === 1) {
              voteAnswer(answerId, "unvote");
            } else {
              voteAnswer(answerId, "upvote");
            }
          }
        }}
        style={{
          height: "auto",
        }}
        disabled={isLoading}
        icon={
          <LikeTwoTone
            twoToneColor={vote === 1 ? "green" : ""}
            style={{
              fontSize: "2rem",
            }}
          />
        }
      />
      <div className="m-0">{score}</div>
      <Button
        type="text"
        shape="circle"
        onClick={() => {
          if (questionId) {
            if (vote === -1) {
              voteQuestion(questionId, "unvote");
            } else {
              voteQuestion(questionId, "downvote");
            }
          } else if (answerId) {
            if (vote === -1) {
              voteAnswer(answerId, "unvote");
            } else {
              voteAnswer(answerId, "downvote");
            }
          }
        }}
        style={{
          height: "auto",
        }}
        disabled={isLoading}
        icon={
          <DislikeTwoTone
            twoToneColor={vote === -1 ? "red" : ""}
            style={{
              fontSize: "2rem",
            }}
          />
        }
      />
    </div>
  );
};

export default VoteContainer;
