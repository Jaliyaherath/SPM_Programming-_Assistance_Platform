/**
 * Exams component implementation
 */
"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Button, Card, FloatButton, Input, Skeleton, Tabs } from "antd";
import { LaptopOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { ExamsContext } from "@/app/context/ExamsContext";
import ExamModal from "./ExamModal";
import ConfirmModal from "./ConfirmModal";

const Exams: React.FC = () => {
  const { data, getAllExams } = useContext(ExamsContext);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getAllExams();
  }, []);

  const allExams = new Array(4).fill(null).map((_, i) => {
    const id = String(i + 1);

    // Filter the exams based on the year
    const filteredExams = data.filter((exam: any) => exam.year == id);

    return {
      label: `YEAR ${id}`,
      key: id,
      children:
        filteredExams.length !== 0 ? (
          filteredExams
            .filter((item: any) => {
              return searchText.toLowerCase() === ""
                ? item
                : item.code.toLowerCase().includes(searchText.toLowerCase());
            })
            .map((exam: any) => {
              return (
                <>
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
                      id="SDD"
                      style={{
                        display: "inline-flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        width: "fit-content",
                        gap: "70px",
                      }}
                    >
                      <LaptopOutlined />
                      <div>{exam.code}</div>
                      <div>{exam.title}</div>
                      <ExamModal examData={exam} />

                      <Link href={`/instructor/exams/edit/${exam.id}`}>
                        {" "}
                        <Button type="primary" ghost icon={<EditFilled />}>
                          Edit
                        </Button>
                      </Link>

                      <ConfirmModal examID={exam.id} />
                    </div>
                  </Card>

                  <br />
                </>
              );
            })
        ) : (
          <div key={id}>No exams found !</div>
        ),
    };
  });

  return (
    <>
      <Input
        type="search"
        style={{
          width: "fit-content",
          height: "fit-content",
          justifyContent: "center",
          marginLeft: "50px",
        }}
        placeholder="Search by module code..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Tabs
        items={allExams}
        style={{ marginLeft: "50px", marginTop: "20px" }}
      />
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{
          height: "50px",
          width: "50px",
          marginRight: "20px",
          position: "fixed",
        }}
        href={"/instructor/exams/new"}
      />
    </>
  );
};

export default Exams;
