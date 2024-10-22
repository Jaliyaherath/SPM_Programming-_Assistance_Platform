/**
 * The side bar component to be used by both students and istructors
 */

"use client";

import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import Exams from "./Exams";
import BreadCrumbs from "../common/BreadCrumbs";
import Link from "next/link";
import InstructorSideBar from "./InstructorSideBar";
const { Header, Sider, Content } = Layout;

export default function ExamsPageLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <InstructorSideBar />
      </Sider> */}

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
          }}
        >
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          /> */}

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
                  title: "Exams",
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
          <Exams />
        </Content>
      </Layout>
    </Layout>
  );
}
