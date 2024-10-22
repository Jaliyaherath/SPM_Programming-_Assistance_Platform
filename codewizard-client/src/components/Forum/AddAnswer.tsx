"use client";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType } from "@/types/ForumTypes";
import { Button, Form, Input } from "antd";
import React, { useContext } from "react";
import MDEditor from "@uiw/react-md-editor";

const AddAnswer = ({ questionId }: { questionId: string }) => {
  const { Item: FormItem } = Form;
  const { postAnswer, isLoading } = useContext(
    ForumContext
  ) as ForumContextType;
  const [form] = Form.useForm();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h4 className="text-2xl font-bold">Add Your Answer</h4>
        <Form
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            const newAnswer: { description: string } = {
              description: values.answer,
            };
            await postAnswer(questionId, newAnswer);

            // reset form
            form.resetFields();
          }}
        >
          <FormItem
            name="answer"
            rules={[
              { required: true, message: "Please input your answer first!" },
            ]}
            data-color-mode="light"
          >
            <MDEditor height={200} preview="edit" />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              disabled={isLoading && form.getFieldValue("answer")}
              htmlType="submit"
              style={{
                width: "100%",
              }}
            >
              Post Your Answer
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default AddAnswer;

// interface MyInputProps {
//   value: number;
//   onChange: (e: any) => void;
// }
// const CustomInput: FC<MyInputProps> = ({ value, onChange }: MyInputProps) => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: "<p>Hello World! 🌎️</p>",
//   });
//   console.log("content", editor ? editor?.getText() : "");
//   return (
//     <>
//       <EditorContent
//         editor={editor}
//         onChange={(e) => {
//           onChange(e);
//         }}
//         value={value}
//       />
//     </>
//   );
// };
