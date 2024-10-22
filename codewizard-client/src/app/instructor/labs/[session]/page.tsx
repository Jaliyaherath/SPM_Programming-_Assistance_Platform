"use client";
import CodeEditor from "@/components/CodeEditor";

import ForumInstructor from "@/components/ForumInstructor";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import { FilePdfOutlined } from "@ant-design/icons";
import { Button, Tabs, TabsProps } from "antd";
import Link from "next/link";
import React, { useContext } from "react";

const Session = ({ params }: { params: { session: string } }) => {
  const { labs } = useContext(LabContext) as LabContextType;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Code Editor",
      children: <CodeEditor />,
    },
    {
      key: "2",
      label: "Q&A Forum",
      children: (
        <>
          <div className="flex justify-end -translate-y-16 -mb-8 z-0">
            <Link href={`/instructor/labs/${params.session}/report`}>
              <Button type="primary" icon={<FilePdfOutlined />}>
                Q&A Forum Report
              </Button>
            </Link>
          </div>
          <ForumInstructor labId={params.session} />
        </>
      ),
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Session;
