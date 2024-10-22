/**
 * ExamModal implementation
 */
import React, { useContext, useState } from "react";
import { Button, Modal, Switch } from "antd";
import {
  ArrowRightOutlined,
  CloseOutlined,
  EyeFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { ExamsContext } from "@/app/context/ExamsContext";
import Link from "next/link";

export default function ExamModal({ examData }: { examData: any }) {
  const caption = examData.code + " - " + examData.title;

  const { updateExamStatus } = useContext(ExamsContext);

  const [isActive, setIsActive] = useState(examData.isActive);

  return (
    <>
      <Button
        onClick={() => {
          Modal.info({
            icon: <InfoCircleFilled style={{ color: "#faad14" }} />,
            mask: true,
            okType: "default",
            centered: true,
            width: "fit-content",
            title: caption,
            content: (
              <>
                <div>
                  <p style={{ fontWeight: "bold" }}>Status</p>
                  <Switch
                    defaultChecked={isActive}
                    onChange={(e) => {
                      setIsActive(e);
                      updateExamStatus(examData.id, e);
                    }}
                  />
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "70px",
                  }}
                >
                  <div>
                    <p style={{ fontWeight: "bold" }}>Year</p>
                    <p style={{ textAlign: "center" }}>{examData.year}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Semester</p>
                    <p style={{ textAlign: "center" }}>{examData.semester}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>No.of questions</p>
                    <p style={{ textAlign: "center" }}>
                      {examData.noOfQuestions}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Pass Mark</p>
                    <p style={{ textAlign: "center" }}>{examData.passMark}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Duration</p>
                    <p style={{ textAlign: "center" }}>{examData.duration}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Exam Password </p>
                    <p style={{ textAlign: "center" }}>{examData.password}</p>
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Created Date</p>
                    <p style={{ textAlign: "center" }}>
                      {examData.createdDate.toString().split("T")[0]}
                    </p>
                  </div>
                </div>
                <div>
                  <br />
                  <div style={{ fontWeight: "bold" }}>Instructions</div>
                  <div>{examData.description}</div>
                </div>

                <br />
                <Button
                  icon={<ArrowRightOutlined />}
                  type="primary"
                  ghost
                  href={`/instructor/exam-questions/${examData.id}`}
                >
                  See Questions
                </Button>
              </>
            ),
            // onOk() {},
          });
        }}
        icon={<EyeFilled />}
        ghost
        type="primary"
      >
        View
      </Button>
    </>
  );
}
