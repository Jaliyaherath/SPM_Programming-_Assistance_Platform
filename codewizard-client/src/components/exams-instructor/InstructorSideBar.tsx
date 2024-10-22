"use client";

import { Menu } from "antd";
import {
  ProfileOutlined,
  FileOutlined,
  ReadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export default function InstructorSideBar() {
  return (
    <Menu
      style={{ minHeight: "100vh", position: "fixed", width: "200px" }}
      theme="dark"
      mode="vertical"
      //defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: <ProfileOutlined />,
          label: <Link href="#">Dashboard</Link>,
        },
        {
          key: "2",
          icon: <ReadOutlined />,
          label: <Link href="/instructor/exams">Exams</Link>,
        },
        {
          key: "3",
          icon: <FileOutlined />,
          label: <Link href="/instructor/exam-reports">Reports</Link>,
        },
        {
          key: "4",
          icon: <LogoutOutlined />,
          label: <Link href="#">Logout</Link>,
        },
      ]}
    />
  );
}
