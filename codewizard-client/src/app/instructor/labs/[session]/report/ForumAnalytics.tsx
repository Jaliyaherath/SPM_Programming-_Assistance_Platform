import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

interface ForumAnalyticsProps {
  noOfQuestions: number;
  noOfAnswers: number;
  questionAnswerRate: number;
}

const ForumAnalytics = ({
  noOfQuestions,
  noOfAnswers,
  questionAnswerRate,
}: ForumAnalyticsProps) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card bordered={false} style={{ width: "250px" }}>
            <Statistic
              title="Number of Questions"
              value={noOfQuestions}
              // precision={2}
              valueStyle={{ color: noOfQuestions < 5 ? "#cf1322" : "#3f8600" }}
              prefix={
                noOfQuestions < 5 ? <ArrowDownOutlined /> : <ArrowUpOutlined />
              }
              // suffix="%"
            />
          </Card>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card bordered={false} style={{ width: "250px" }}>
            <Statistic
              title="Number of Answers"
              value={noOfAnswers}
              // precision={2}
              valueStyle={{ color: noOfAnswers < 10 ? "#cf1322" : "#3f8600" }}
              prefix={
                noOfAnswers < 10 ? <ArrowDownOutlined /> : <ArrowUpOutlined />
              }
            />
          </Card>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card bordered={false} style={{ width: "250px" }}>
            <Statistic
              title="Questions Answered"
              value={questionAnswerRate}
              precision={2}
              valueStyle={{
                color: questionAnswerRate < 50 ? "#cf1322" : "#3f8600",
              }}
              prefix={
                questionAnswerRate < 50 ? (
                  <ArrowDownOutlined />
                ) : (
                  <ArrowUpOutlined />
                )
              }
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ForumAnalytics;
