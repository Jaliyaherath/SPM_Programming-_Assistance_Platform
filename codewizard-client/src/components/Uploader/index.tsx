import React, { useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { InputProps, UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import { customRequest } from "@/lib/Firebase/upload.service";
import { UploadChangeParam } from "antd/es/upload";

const { Dragger } = Upload;

type CustomFormItemProps = {
  value?: string;
  onChange?: (url: string | undefined) => void;
};
const props: UploadProps = {
  multiple: false,
  accept: ".pdf",
  beforeUpload: (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error(`${file.name} is not a png file`);
    }
    return isPDF || Upload.LIST_IGNORE;
  },
  maxCount: 1,
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
  customRequest: customRequest,
};
const Uploader: React.FC<CustomFormItemProps> = ({ onChange, value }) => {
  const [fileList, setFileList] = useState<UploadFile[]>(
    value !== undefined
      ? [
          {
            uid: "0",
            name: "uploaded.pdf",
            url: value,
            status: "done",
          },
        ]
      : []
  );

  const onFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file;
    if (status == "uploading") setFileList([info.file]);
    if (status === "done") {
      console.log(`${info.file.response} file uploaded successfully.`);
      if (onChange) onChange(info.file.response);
      setFileList([{ ...info.file, url: info.file.response }]);
    } else if (status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Dragger
      {...props}
      onChange={onFileChange}
      fileList={fileList}
      onRemove={() => {
        if (onChange) onChange(undefined);
        setFileList([]);
      }}
      listType="picture"
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single.</p>
    </Dragger>
  );
};

export default Uploader;
