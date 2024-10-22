import { useContext, useState } from "react";
import { Button, Drawer } from "antd";
import Chat from "./Chat";
import MessageInput from "./MessageInput";
import { RobotOutlined } from "@ant-design/icons";

const ChatDrawer: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <>
      <div className="w-fit">
        <Drawer
          title="CODEWIZARD"
          placement="right"
          onClose={() => setIsOpened(false)}
          open={isOpened}
          width={720}
        >
          <div className="flex flex-col justify-between h-full">
            <Chat />
            <MessageInput />
          </div>
        </Drawer>
      </div>
      <div className="h-1/2 top-0 right-0 absolute">
        <Button
          type="primary"
          onClick={() => setIsOpened(true)}
          style={{
            height: "100%",
            borderRadius: "1rem 0 0 1rem",
          }}
          icon={<RobotOutlined />}
        />
      </div>
    </>
  );
};

export default ChatDrawer;
