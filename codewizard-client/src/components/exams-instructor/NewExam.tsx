/**
 * NewExam form implementation
 */
"use client";
import React, { useContext } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from "antd";
import { ExamsContext } from "@/app/context/ExamsContext";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Meta from "antd/es/card/Meta";

dayjs.extend(customParseFormat);

const NewExam: React.FC = () => {
  const { data, createExam } = useContext(ExamsContext);

  /* Set of states for the form inputs */
  const [moduleCode, setModuleCode] = React.useState("");
  const [examTitle, setExamTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [year, setYear] = React.useState(1);
  const [semester, setSemester] = React.useState(1);
  const [passMark, setPassMark] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [duration, setDuration] = React.useState("");

  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      <center>
        <Card
          hoverable
          style={{
            width: "50%",
            border: "1px solid #ffd666",
          }}
        >
          <Form
            onFinish={() => {
              createExam({
                code: moduleCode,
                title: examTitle,
                description: description,
                year: year,
                semester: semester,
                duration: duration,
                passMark: passMark,
                password: password,
              });
            }}
            style={{ maxWidth: "fit-content", marginTop: "20px" }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item>
                <Input
                  placeholder="Module code"
                  required
                  onChange={(e) => setModuleCode(e.target.value)}
                />
              </Form.Item>
              <Form.Item hasFeedback>
                <Input
                  placeholder="Exam title"
                  required
                  onChange={(e) => setExamTitle(e.target.value)}
                />
              </Form.Item>

              <Form.Item className="w-[205px]">
                <TimePicker
                  defaultValue={dayjs("00:00:00", "HH:mm:ss")}
                  onChange={(e: any) => {
                    const hrs = e.$H ? e.$H : "00";
                    const mins = e.$m ? e.$m : "00";
                    const secs = e.$s ? e.$s : "00";

                    setDuration(`${hrs}:${mins}:${secs}`);
                  }}
                  format="HH:mm:ss"
                  style={{ width: "100%" }}
                  allowClear={false}
                  placeholder="Duration"
                />
              </Form.Item>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
                <Form.Item className="w-[90px]">
                  <Select
                    defaultValue={1}
                    options={[
                      { value: 1, label: "Y1" },
                      { value: 2, label: "Y2" },
                      { value: 3, label: "Y3" },
                      { value: 4, label: "Y4" },
                    ]}
                    onChange={(e: any) => {
                      setYear(e);
                    }}
                  />
                </Form.Item>
                <Form.Item className="w-[90px]">
                  <Select
                    defaultValue={1}
                    options={[
                      { value: 1, label: "S1" },
                      { value: 2, label: "S2" },
                    ]}
                    onChange={(e: any) => {
                      setSemester(e);
                    }}
                  />
                </Form.Item>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <Form.Item hasFeedback validateStatus="" className="w-[206px]">
                  <Input
                    placeholder="Exam password"
                    required
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item hasFeedback validateStatus="" className="w-[206px]">
                  <InputNumber
                    placeholder="Pass mark"
                    id="success"
                    style={{ width: "100%" }}
                    required
                    onChange={(e: any) => {
                      setPassMark(e);
                    }}
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item hasFeedback>
              <Input.TextArea
                placeholder="Enter any rules and information about the exam"
                id="success"
                allowClear
                autoSize
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>

            <Button type="primary" ghost size="large" htmlType="submit">
              ADD
            </Button>
          </Form>
        </Card>
      </center>

      <center></center>
    </>
  );
};

export default NewExam;
