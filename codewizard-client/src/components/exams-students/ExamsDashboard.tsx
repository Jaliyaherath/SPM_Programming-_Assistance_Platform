/**
 * ExamsDashboard implementation for students
 */
"use client";

import { ExamsContext } from "@/app/context/ExamsContext";
import { ArrowRightOutlined, LaptopOutlined } from "@ant-design/icons";
import { Button, Card, Tabs } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function ExamsDashboard() {
  const { data, getAllExams } = useContext(ExamsContext);

  const activeExams = data.filter((exam: any) => exam.isActive === true);

  useEffect(() => {
    async function fetchData() {
      await getAllExams();
    }

    fetchData();
  }, []);

  const allExams = new Array(4).fill(null).map((_, i) => {
    const id = String(i + 1);

    //Filter the exams based on the year
    const filteredExams = activeExams.filter((exam: any) => exam.year == id);

    return {
      label: `YEAR ${id}`,
      key: id,
      children:
        filteredExams.length !== 0 ? (
          filteredExams.map((exam: any) => {
            return (
              <>
                <Link href={`/online-exams/${exam.id}`}>
                  <Card
                    hoverable
                    key={exam.id}
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      justifyContent: "center",
                      border: "1px solid #e8e8e8",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "200px",
                      }}
                    >
                      <div
                        id="SDD"
                        style={{
                          display: "inline-flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          width: "fit-content",
                          gap: "150px",
                        }}
                      >
                        <LaptopOutlined />
                        <div>{exam.code}</div>
                        <div style={{ fontWeight: "bold" }}>{exam.title}</div>
                      </div>
                    </div>
                  </Card>
                </Link>
                <br />
              </>
            );
          })
        ) : (
          <div key={id}>No active exams !</div>
        ),
    };
  });

  return (
    <Tabs items={allExams} style={{ marginLeft: "50px", marginTop: "20px" }} />
  );
}
