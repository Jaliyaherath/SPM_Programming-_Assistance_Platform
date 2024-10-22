"use client";

import React, { useState, useEffect } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Student Number",
    dataIndex: "studentNumber",
  },
  {
    title: "Marks",
    dataIndex: "score",
    sorter: {
      compare: (a: any, b: any) => a.score - b.score,
      multiple: 2,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: {
      compare: (a: any, b: any) => a.status - b.status,
      multiple: 4,
    },
  },
];

// const onChange = (filters, sorter, extra) => {};
export default function StudentReportDetails() {
  const [studentData, setStudentData] = useState<any>([]);

  useEffect(() => {
    // Function to fetch all exam results
    async function getStudentResults() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/results");
        const sData = await res.json();

        console.log("sData", sData.results);

        let data = [];

        for (let obj of sData.results) {
          if (obj.examID == window.location.pathname.split("/")[3])
            data.push({
              studentNumber: obj.studentID.userRegNo,
              score: obj.marks,
              status: obj.status,
            });
        }

        setStudentData(data);
      } catch (err: any) {
        console.log(err.message);
      }
    }

    getStudentResults();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={studentData}
      bordered={true}
      pagination={false}
    />
  );
}
