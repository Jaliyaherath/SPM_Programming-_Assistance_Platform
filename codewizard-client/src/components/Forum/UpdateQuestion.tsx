"use client";
import { Modal } from "antd";
import React, { useContext } from "react";

import { Form, Input, Button, Checkbox } from "antd";
import { ForumContext } from "@/context/ForumProvider";
import { ForumContextType, Question } from "@/types/ForumTypes";
import { EditFilled } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";

const UpdateQuestion = ({ question }: { question: Question }) => {
  const { Item: FormItem } = Form;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { updateQuestion } = useContext(ForumContext) as ForumContextType;
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values: any) => {
    const newQuestion = {
      title: values.title,
      description: values.description,
    };
    await updateQuestion(question._id, newQuestion);
    handleOk();
  };
  return (
    <div>
      <Button
        type="text"
        shape="circle"
        onClick={showModal}
        icon={<EditFilled className=" hover:text-custom-site-color text-xl" />}
      />
      {isModalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Edit Question</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCancel}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <Form
                  onFinish={onFinish}
                  layout="vertical"
                  requiredMark={false}
                >
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <FormItem
                      label="Title"
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Please input your title!",
                        },
                      ]}
                      initialValue={question.title}
                    >
                      <Input />
                    </FormItem>
                    <FormItem
                      label="Description"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Please input your description!",
                        },
                      ]}
                      initialValue={question.description}
                      data-color-mode="light"
                    >
                      <MDEditor height={200} preview="edit" />
                    </FormItem>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleCancel}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      // onClick={handleOk}
                    >
                      Save Changes
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default UpdateQuestion;
