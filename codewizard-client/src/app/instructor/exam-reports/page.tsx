/**
 * This is the exam reports page
 */

"use client";

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import Link from "next/link";
import InstructorSideBar from "@/components/exams-instructor/InstructorSideBar";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import Reports from "@/components/exams-instructor/Reports";

const { Header, Sider, Content } = Layout;

export default function ExamsPageLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <BreadCrumbs
              linkList={[
                {
                  title: <Link href="#">Dashboard</Link>,
                },
                {
                  title: "Reports",
                },
              ]}
            />
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Reports />
        </Content>
      </Layout>
    </Layout>
  );
}
