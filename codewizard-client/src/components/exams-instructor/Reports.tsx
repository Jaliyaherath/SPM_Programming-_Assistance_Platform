import React, { useContext, useEffect, useState } from "react";
import { Card, Input } from "antd";
import { ExamsContext } from "@/app/context/ExamsContext";
import Link from "next/link";

const gridStyle = {
  width: "100%",
  //   textAlign: "center",
};

export default function Reports() {
  useEffect(() => {
    getAllExams();
  }, []);

  const { data, getAllExams } = useContext(ExamsContext);
  const [searchText, setSearchText] = useState("");

  return (
    <Card title="Reports">
      <Input
        type="search"
        style={{
          minWidth: "100vh",
          height: "fit-content",
        }}
        placeholder="Search by module code..."
        onChange={(e) => setSearchText(e.target.value)}
      />

      <br />
      <br />

      {data &&
        data
          .filter((item: any) => {
            return searchText.toLowerCase() === ""
              ? item
              : item.code.toLowerCase().includes(searchText.toLowerCase());
          })
          .map((exam: any, index: number) => (
            <Link
              href={`/instructor/exam-reports/${exam.id}`}
              target="_blank"
              key={index}
            >
              {" "}
              <Card.Grid style={gridStyle}>
                <h1 style={{ fontWeight: "bold" }}>{exam.code}</h1>
                <h3>{exam.title}</h3>
              </Card.Grid>
            </Link>
          ))}
    </Card>
  );
}
