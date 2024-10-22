import React, { useEffect, useState } from "react";
import { Badge, Descriptions } from "antd";

export default function ExamDescription({ examData }: { examData: any }) {
  const items = [
    {
      key: "1",
      label: "Code",
      children: examData.code,
    },
    {
      key: "2",
      label: "Year",
      children: examData.year,
    },
    {
      key: "3",
      label: "Semester",
      children: examData.semester,
    },
    {
      key: "4",
      label: "Title",
      children: examData.title,
    },
    {
      key: "5",
      label: "Duration",
      children: examData.duration,
    },
    {
      key: "7",
      label: "Status",
      children: examData.isActive ? (
        <Badge status="processing" text="Ongoing" />
      ) : (
        <Badge status="success" text="Concluded" />
      ),
    },
    {
      key: "6",
      label: "Description",
      children: examData.description,
      span: 3,
    },
    {
      key: "8",
      label: "No.of Questions",
      children: examData.noOfQuestions,
    },
    {
      key: "9",
      label: "Pass Mark",
      children: examData.passMark,
    },
    {
      key: "10",
      label: "Password",
      children: examData.password,
    },
    {
      key: "11",
      label: "Type",
      children: "Multiple Choice Questions (MCQ)",
    },
    {
      key: "11",
      label: "Created Date",
      children: `${examData.createdDate}`,
    },
  ];

  return <Descriptions bordered={true} items={items} />;
}
