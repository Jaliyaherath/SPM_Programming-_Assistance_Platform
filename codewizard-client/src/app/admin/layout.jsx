"use client";
import React, { useState } from "react";
import theme1 from "@/theme/themeConfig";
import { useRouter } from "next/navigation";

import {
  DesktopOutlined,
  FileOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { Breadcrumb, ConfigProvider, Layout, Menu, theme, Avatar } from "antd";
import UserList from "@/components/userManagement/UserList";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", 1, <DashboardOutlined />),
  getItem("Create Accounts", 2, <EditOutlined />),
  getItem("Users", "sub1", <UserOutlined />, [
    getItem("Students", "3"),
    getItem("Instructors", "4"),
    // getItem('Admins', '5'),
  ]),
  getItem("Reports", "sub2", <FileOutlined />, [
    getItem("Lab Attendance", "6"),
  ]),
  // getItem('Reports', 'sub2', <FileOutlined />, [getItem('Lab Attendance', '6'), getItem('Team 2', '8')]),
  getItem("Settings", "9", <SettingOutlined />),
];

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const [breadcrumb, setBreadcrumb] = useState("Dashboard");

  const handleMenuItemClick = (key) => {
    switch (key) {
      case "1":
        router.push("/admin/dashboard");
        setBreadcrumb("Dashboard");
        break;
      case "2":
        router.push("/admin/createAccount");
        setBreadcrumb("Create Account");
        break;
      case "3":
        router.push("/admin/users/student");
        setBreadcrumb("Students");
        break;
      case "4":
        router.push("/admin/users/instructor");
        setBreadcrumb("Instructors");
        break;
      case "6":
        router.push("/admin/reports/labattendance");
        setBreadcrumb("Lab Attendance");
        break;
      default:
        console.log(key);
    }

    console.log(key);
  };

  return (
    <section>
      <ConfigProvider theme={theme1}>
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
              onClick={({ key }) => handleMenuItemClick(key)}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            />
            {/* <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> */}
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Code Wizard ©2024 Created by SE-S2-WE-12
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </section>
  );
}
