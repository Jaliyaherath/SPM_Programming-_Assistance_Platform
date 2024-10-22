"use client";
import AiChatBot from "@/components/AiChat";
import CodeEditor from "@/components/CodeEditor";
import Forum from "@/components/Forum";
import ForumDrawer from "@/components/Forum/ForumDrawer";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

const Session = ({ params }: { params: { session: string } }) => {
  const { labs, loading, enrollStudent } = useContext(
    LabContext
  ) as LabContextType;
  const { data: session, status: authStatus } = useSession();
  const [userValidated, setUserValidated] = React.useState<boolean>(false);

  useEffect(() => {
    if (labs.length > 0) {
      const lab = labs.find((lab) => lab._id === params.session);
      if (lab) {
        // is user already enrolled
        const valid: boolean =
          lab?.enrolledStudents.find(
            (student) => student.user === session?.user?.id
          ) != undefined;
        setUserValidated(valid);
      }
    }
  }, [labs, params.session, session?.user?.id]);

  if (!params.session) return <div>404</div>;



  if (loading || authStatus === "loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin spinning={true} />
      </div>
    );

    

    const lab = labs.find((lab) => lab._id === params.session);
  if (!lab)
    return <div className="flex justify-center items-center h-screen">404- lab not found</div>;

  if (!userValidated)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <>
          <Link href={`/labs`}>
            <Button type="dashed">Go back</Button>
          </Link>
          <h1 className="text-4xl font-bold">
            {lab.name} | Y {lab.semester} | S {lab.year}
          </h1>
        </>
        <Form
          layout="vertical"
          onFinish={async (values) => {
            const success: boolean = await enrollStudent(
              params.session,
              values.password
            );
            if (success) setUserValidated(true);
          }}
          className="flex flex-col"
        >
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Enroll
            </Button>
          </Form.Item>
        </Form>
      </div>
    );

  return (
    <div className="relative h-full overflow-auto px-8 pr-16">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-end">
          <h1 className="text-4xl font-bold">{lab.name}</h1>
          <span>
            Module {lab.module}, Year {lab.semester} Semester {lab.year}
          </span>
        </div>
        <a href={lab.pdfUrl} target="_blank" rel="noreferrer">
          <Button type="primary" icon={<FilePdfOutlined />}>
            Lab Sheet
          </Button>
        </a>
      </div>
      <CodeEditor />
      <AiChatBot />
      <Forum labId={params.session} />
    </div>
  );
};

export default Session;
