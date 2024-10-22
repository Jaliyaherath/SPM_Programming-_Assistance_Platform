"use client";
import React from "react";
import {
  CalculatorOutlined,
  CodeOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  key: React.Key,
  label: React.ReactNode,
  link?: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label: link ? <Link href={link}>{label}</Link> : <>{label}</>,
  } as MenuItem;
}

const items: MenuItem[] = [
  // getItem("Option 1", "/instructor/labs", "1", <UserOutlined />),
  // getItem("Option 2", "/instructor/labs", "2", <UserOutlined />),
  getItem("1", "Dashboard", "/instructor", <HomeOutlined />),
  getItem("sub1", "Lab Sessions", "", <CodeOutlined />, [
    getItem("2", "All Labs", "/instructor/labs"),
    getItem("3", "Create", "/instructor/labs/create"),
    getItem("4", "Report", "/instructor/labs/reports"),
  ]),
  getItem("sub2", "Exams", "", <CalculatorOutlined />, [
    getItem("6", "Exams", "/instructor/exams"),
    getItem("9", "Reports", "/instructor/exam-reports"),
  ]),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathname = usePathname();
  return (
    <Layout className="h-full">
      <Sider
        breakpoint="lg"
        collapsedWidth="100"
        hidden={pathname?.startsWith("/instructor/exam-reports/")}
        // style={{
        //   minHeight: "800px",
        // }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={undefined}
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          style={{ padding: "24px 16px", height: "100%", overflow: "auto" }}
        >
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
      </Layout>
    </Layout>
  );
}
