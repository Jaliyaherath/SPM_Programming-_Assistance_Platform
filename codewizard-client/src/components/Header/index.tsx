"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, Button, Dropdown } from "antd";
import Image from "next/image";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const hideHeader = pathname === "/login";

  if (hideHeader) return null;
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/profile">Profile</Link>,
      icon: <UserOutlined />,
    },

    {
      key: "4",
      danger: true,
      label: "Log Out",
      onClick: () => {
        console.log("signOut");
        signOut();
      },
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <div className="bg-black text-white flex justify-between items-center h-16 px-8">
      <Link
        href={
          session?.user.role == "admin"
            ? "/admin/dashboard"
            : session?.user.role == "instructor"
            ? "/instructor"
            : "/"
        }
      >
        <Image
          src="/codexguru-text-logo.png"
          width={200}
          height={70}
          alt="CodexWizard Logo"
        />
      </Link>
      <div className="flex justify-center items-center gap-2">
        {status != "loading" && session?.user && (
          <>
            <p className="text-yellow-50">
              {session?.user?.firstName} {session?.user?.lastName}{" "}
              {session?.user.role == "admin"
                ? "(Admin)"
                : session?.user.role == "instructor"
                ? "(Instructor)"
                : ""}
            </p>
            <Dropdown menu={{ items }}>
              <Avatar
                size="large"
                style={{
                  backgroundColor: "var(--primary-color)",
                }}
              >
                {session?.user?.firstName.charAt(0)}{" "}
                {session?.user?.lastName.charAt(0)}
              </Avatar>
            </Dropdown>
          </>
        )}

        {status != "loading" && !session && (
          <>
            <Link href="login">
              <Button type="primary">Sign in</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
