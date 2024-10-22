/**
 * NewQuestion implementation
 */
// @ts-nocheck
"use client";
import React, { useContext, useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select, Space, Typography } from "antd";
import { validateQuesForm } from "@/app/utils/OnlineExamUtil";
import { ExamsContext } from "@/app/context/ExamsContext";
import BreadCrumbs from "../common/BreadCrumbs";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NewQuestion() {
  const [form] = Form.useForm();

  const { addQuestions, getExam } = useContext(ExamsContext);

  const [examData, setExamData] = useState<any>("");

  const params = useParams();

  useEffect(() => {
    async function fetchExamData() {
      const data = await getExam(params?.id);

      setExamData(data);
    }

    fetchExamData();
  }, [params]);

  return (
    <>
      <div style={{ marginLeft: "50px", marginTop: "25px" }}>
        <BreadCrumbs
          linkList={[
            {
              title: <Link href="#">Dashboard</Link>,
            },
            {
              title: <Link href={`/instructor/exams`}>{examData.title}</Link>,
            },
            {
              title: "Questions",
            },
          ]}
        />
      </div>{" "}
      <br />
      <Form
        onFinish={function () {
          if (validateQuesForm(form.getFieldsValue())) {
            addQuestions(
              // window.location.pathname.split("/")[3],
              params?.id,
              form.getFieldsValue()
            );
          } else {
            alert("Please add at least one option");
          }
        }}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        form={form}
        name="dynamic_form_complex"
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
        initialValues={{
          items: [{}],
        }}
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {fields.map((field) => (
                <Card
                  style={{ marginLeft: "50px" }}
                  hoverable
                  size="small"
                  title={`Question ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="Question"
                    name={[field.name, "name"]}
                    required
                  >
                    <Input required />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Option(s)">
                    <Form.List name={[field.name, "list"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item
                                noStyle
                                name={[subField.name, "option"]}
                              >
                                <Input placeholder="Answer" required />
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={[subField.name, "correctness"]}
                              >
                                <select required title="s">
                                  <option value="">None</option>
                                  <option value={true}>Correct</option>
                                  <option value={true}>Incorrect</option>
                                </select>
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
                            + Add Option
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button
                type="dashed"
                onClick={() => add()}
                block
                style={{ marginLeft: "50px", width: "550px" }}
              >
                + Add Question
              </Button>
            </div>
          )}
        </Form.List>

        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}

        <br />
        <br />
        <center>
          <Button type="primary" ghost htmlType="submit">
            ADD ALL
          </Button>
        </center>
      </Form>
    </>
  );
}
