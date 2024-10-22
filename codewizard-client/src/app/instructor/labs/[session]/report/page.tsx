"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { forumService } from "@/services";
import { useSession } from "next-auth/react";
import { Button, Card, Col, Row } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import ForumAnalytics from "./ForumAnalytics";
import LeaderBoard from "./LeaderBoard";
import QuestionListView from "./QuestionListView";
import html2PDF from "jspdf-html2canvas";
// import dynamic from "next/dynamic";

// const html2PDF = dynamic(() => import("jspdf-html2canvas"), {
//   ssr: false,
// });
const LabReports = () => {
  const params = useParams();
  const [reportData, setReportData] = useState<any>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!params?.session) return;
    if (status === "loading") return;
    if (!session?.user?.token) return;

    forumService(session.user.token)
      .getReport(params.session.toString())
      .then((data) => setReportData(data))
      .catch((err) => console.log(err));
  }, [params?.session, session?.user.token, status]);

  if (!reportData) return <div>Loading...</div>;
  if (reportData?.error_message)
    return <Card>{reportData?.error_message}</Card>;

  // Function to download as pdf
  async function downloadPDF() {
    const pages = document.getElementById("lab-session-report");
    if (!pages) return;
    await html2PDF(pages, {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      output: `./lab-session-report.pdf`,
      margin: {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25,
      },

      html2canvas: {
        scrollX: 0,
        scrollY: -window.scrollY,
      },
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <Button
        type="primary"
        icon={<FilePdfOutlined />}
        style={{ marginRight: "25px", float: "right" }}
        onClick={downloadPDF}
      >
        DOWNLOAD
      </Button>
      <div
        className=" bg-gray-100 p-4 flex flex-col gap-5"
        id="lab-session-report"
      >
        <h1 className="text-4xl font-bold mb-4 text-center underline">
          Q&A Forum Report
        </h1>

        {/* <h2 className="text-2xl font-bold mb-4">Forum Analytics</h2> */}
        <ForumAnalytics
          noOfQuestions={reportData.totalNumberOfQuestions}
          noOfAnswers={reportData.totalNumberOfAnswers}
          questionAnswerRate={reportData.percentageOfQuestionsAnswered}
        />
        <Card title="Lab Session Details">
          <div className="text-lg font-medium">
            Lab Session: {reportData?.labData.name}
          </div>
          <div className="text-gray-500">Year: {reportData?.labData.year}</div>
          <div className="text-gray-500">
            Semester: {reportData?.labData.semester}
          </div>
          <div className="text-gray-500">
            Lab Date:{" "}
            {format(new Date(reportData?.labData.startDate), "MM/dd/yyyy")}
          </div>
        </Card>
        <LeaderBoard data={reportData.leaderboard} />

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <QuestionListView
              title="Most Viewed Questions"
              data={reportData.mostViewQuestions}
              commonValue="views"
              cName="Views"
            />
          </Col>
          <Col span={12}>
            <QuestionListView
              title="Most Answered Questions"
              data={reportData.mostAnsweredQuestions}
              commonValue="answers"
              cName="Answers"
            />
          </Col>
          <Col span={12}>
            <QuestionListView
              title="Most Up Voted Questions"
              data={reportData.mostUpVotedQuestions}
              commonValue="score"
              cName="Score"
            />
          </Col>
          <Col span={12}>
            <QuestionListView
              title="Most Down Voted Questions"
              data={reportData.mostDownVotedQuestions}
              commonValue="score"
              cName="Score"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LabReports;
