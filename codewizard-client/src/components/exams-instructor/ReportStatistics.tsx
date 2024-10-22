import React, { useEffect, useState } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LikeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { useParams } from "next/navigation";

const ReportStatistics = () => {
  const params = useParams();

  const [studentAttempts, setStudentAttempts] = useState(0);
  const [totMarks, setTotMarks] = useState(0);
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);

  useEffect(() => {
    // Function to fetch all exam results
    async function getStudentResults() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/results");
        const sData = await res.json();

        let count = 0;
        let totMarks = 0;
        let passedCount = 0;
        let failedCount = 0;

        for (let obj of sData.results) {
          if (obj.examID == params?.id) {
            count = count + 1;
            totMarks += obj.marks;

            if (obj.status == "Fail") {
              failedCount++;
            } else {
              passedCount++;
            }
          }
        }

        setStudentAttempts(count);
        setTotMarks(totMarks);
        setPassed(passedCount);
        setFailed(failedCount);
      } catch (err: any) {
        console.log(err.message);
      }
    }

    getStudentResults();
  }, []);

  return (
    <Row gutter={12}>
      <Col span={12}>
        <Statistic
          title="Attempts"
          value={studentAttempts}
          prefix={<TeamOutlined />}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Col>
      <Col span={12}>
        <Statistic
          title="Average"
          value={studentAttempts !== 0 ? totMarks / studentAttempts : 0}
        />
      </Col>
      <Col span={12}>
        <Statistic
          title="Passed"
          value={(passed / studentAttempts) * 100}
          precision={2}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Col>{" "}
      <Col span={12}>
        <Statistic
          title="Failed"
          value={(failed / studentAttempts) * 100}
          precision={2}
          valueStyle={{
            color: "#cf1322",
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Col>
    </Row>
  );
};
export default ReportStatistics;
