/**
 * This is the overview page of an exam report
 */

"use client";
// import dynamic from "next/dynamic";
import { ExamsContext } from "@/app/context/ExamsContext";
import StudentReportDetails from "@/components/exams-instructor/StudentReportDetails";
import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useContext, useEffect, useState } from "react";

import html2PDF from "jspdf-html2canvas";

import ExamDescription from "@/components/exams-instructor/ExamDescription";
import ReportStatistics from "@/components/exams-instructor/ReportStatistics";
import { useParams } from "next/navigation";

export default function ExamReportOverview() {
  const { getExam } = useContext(ExamsContext);
  const [examData, setExamData] = useState("");

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getExam(params?.id);
      setExamData(data);
    }

    fetchData();
  }, [getExam]);

  // Function to download as pdf
  async function downloadPDF() {
    const pages = document.getElementById("page-content");
    if (!pages) return;
    await html2PDF(pages, {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      output: `./pdf`,
      html2canvas: {
        scrollX: 0,
        scrollY: -window.scrollY,
      },
    });
  }

  return (
    <>
      <center>
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bolder",
            textDecoration: "underline",
          }}
        >
          Report
        </h1>
        <Button
          type="primary"
          icon={<FilePdfOutlined />}
          style={{ marginRight: "25px", float: "right" }}
          onClick={downloadPDF}
        >
          DOWNLOAD
        </Button>
      </center>
      <br />

      <br />
      <br />

      <div id="page-content">
        <Card
          style={{
            marginLeft: "25px",
            marginRight: "25px",
            overflow: "auto",
            height: "350px",
          }}
        >
          <ReportStatistics />
        </Card>

        <br />

        <Card
          title="Exam Details"
          style={{
            marginLeft: "25px",
            marginRight: "25px",
            overflow: "auto",
            height: "350px",
          }}
        >
          <ExamDescription examData={examData} />
        </Card>

        <br />

        <Card
          title="Student Details"
          style={{
            marginLeft: "25px",
            marginRight: "25px",
            overflow: "auto",
            height: "350px",
          }}
        >
          <StudentReportDetails />
        </Card>

        <div style={{ marginBottom: "50px" }}></div>
      </div>
    </>
  );
}
