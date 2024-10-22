import { useContext, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Tooltip, Row } from "antd";
import { AIChatContext } from "@/context/AIChatContext";
import IAiChatContext from "@/interfaces/IAiChatContext";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import IMessage from "@/interfaces/IMessage";
const MessageInput: React.FC = () => {
    const aiChatCtx = useContext<IAiChatContext | null>(AIChatContext);
    const { isWaitingForReply, messageListLength, setMessageListHandler, isError, errorMessage } = aiChatCtx!;

    const [form] = useForm();

    return (
        <Form
            form={form}
            onFinish={(values) => {
                if (values.message.trim() === '') {
                    return;
                }
                const newMessage: IMessage = {
                    text: values.message,
                    isUser: true,
                    timestamp: new Date().toLocaleDateString(),
                    id: messageListLength + 1
                }
                setMessageListHandler(newMessage);

                form.resetFields();
            }}
        >
            <div className="flex justify-between items-start mt-4 gap-4">
                <Form.Item
                    name="message"
                    rules={[
                        {
                            required: true,
                            message: "Please input your message!",
                            max: 1000, //TODO change this to what ever the max length of the message is
                        },
                    ]}
                    className="w-full"
                >
                    <TextArea
                        placeholder="Enter your message here"
                        className="w-full"
                        autoSize
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        icon={<SendOutlined size={10} />}
                        type="primary"
                        loading={isWaitingForReply}
                        htmlType="submit"
                    />
                </Form.Item>
            </div>
        </Form>
    );
};

export default MessageInput;
