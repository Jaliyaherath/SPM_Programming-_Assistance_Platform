/**
 * EditExam form implementation
 */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { ExamsContext } from "@/app/context/ExamsContext";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { useParams } from "next/navigation";

dayjs.extend(customParseFormat);

export default function EditExam() {
  const { getExam, updateExam } = useContext(ExamsContext);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const exam = await getExam(params?.id);

      setModuleCode(exam.code);
      setExamTitle(exam.title);
      setDescription(exam.description);
      setYear(exam.year);
      setSemester(exam.semester);
      setPassMark(exam.passMark);
      setPassword(exam.password);
      setDuration(exam.duration);
    }

    fetchData();
  }, []);

  const [moduleCode, setModuleCode] = React.useState("");
  const [examTitle, setExamTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [year, setYear] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [passMark, setPassMark] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [duration, setDuration] = React.useState("");

  return (
    <center>
      <Card
        hoverable
        style={{
          width: "50%",
          border: "1px solid #ffd666",
        }}
      >
        <Form
          onFinish={() =>
            updateExam(Number(params?.id), {
              code: moduleCode,
              title: examTitle,
              description: description,
              year: year,
              semester: semester,
              passMark: passMark,
              password: password,
              duration: duration,
            })
          }
          style={{ maxWidth: "fit-content", marginTop: "20px" }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            {" "}
            <Form.Item>
              <Input
                value={moduleCode}
                placeholder="Module code"
                required
                onChange={(e) => setModuleCode(e.target.value)}
              />
            </Form.Item>
            <Form.Item hasFeedback>
              <Input
                value={examTitle}
                placeholder="Exam title"
                required
                onChange={(e) => setExamTitle(e.target.value)}
              />
            </Form.Item>
            <Form.Item className="w-[205px]">
              <TimePicker
                value={dayjs(duration, "HH:mm:ss")}
                onChange={(e: any) => {
                  const hrs = e?.$H ? e?.$H : "00";
                  const mins = e?.$m ? e?.$m : "00";
                  const secs = e?.$s ? e?.$s : "00";

                  setDuration(`${hrs}:${mins}:${secs}`);
                }}
                format="HH:mm:ss"
                style={{ width: "100%" }}
                allowClear={false}
              />
            </Form.Item>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0px",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "25px",
                }}
              >
                <Form.Item className="w-[90px]">
                  <Select
                    value={year}
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
                    value={semester}
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

              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                <Form.Item hasFeedback validateStatus="" className="w-[206px]">
                  <Input
                    value={password}
                    placeholder="Exam password"
                    required
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item hasFeedback validateStatus="" className="w-[206px]">
                  <InputNumber
                    value={passMark}
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
          </div>

          <Form.Item hasFeedback>
            <Input.TextArea
              value={description}
              placeholder="Enter any rules and information about the exam"
              id="success"
              allowClear
              autoSize
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" ghost size="large" htmlType="submit">
            SAVE
          </Button>
        </Form>
      </Card>
    </center>
  );
}
