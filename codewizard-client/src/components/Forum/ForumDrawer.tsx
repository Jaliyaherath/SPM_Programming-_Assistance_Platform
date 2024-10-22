"use client";
import { CommentOutlined, RobotOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import React from "react";
import ForumMain from "./ForumMain";
import { set } from "date-fns";

const ForumDrawer = ({ labId }: { labId: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Drawer
        title="Q&A Forum"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        width={720}
        bodyStyle={{
          backgroundColor: "rgba(0,0,0,0.1)",
          padding: "0",
        }}
      >
        <ForumMain labId={labId} />
      </Drawer>
      <div className="h-1/2 bottom-0 right-0 absolute">
        {/* <Button
          type="primary"
          onClick={() => setIsOpen(true)}
          className="h-full bg-[#00B2BD] hover:bg-[#00949D]  rounded-none"
          icon={<CommentOutlined />}
        /> */}

        <Button
          type="primary"
          color="secondary"
          onClick={() => setIsOpen(true)}
          // className="h-full bg-[#00B2BD] hover:bg-[#00949D]  rounded-none"
          style={{
            height: "100%",
            borderRadius: "1rem 0 0 1rem",
            backgroundColor: "var(--custom-blue-unkown)",
          }}
          icon={<CommentOutlined />}
        />
      </div>
    </div>
  );
};

export default ForumDrawer;
