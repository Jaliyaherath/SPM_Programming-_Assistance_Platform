"use client";
import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

type FieldType = {
  userRegNo?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const { Item } = Form;
  const { Password } = Input;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user.role === "admin") router.push("/admin");
      else if (session.user.role === "instructor") router.push("/instructor");
      else router.push("/");
    }
  }, [router, session]);

  const onFinish = async (values: any) => {
    try {
      await signIn("credentials", {
        userRegNo: values.userRegNo,
        password: values.password,
        callbackUrl: searchParams?.get("callbackUrl") || "/",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen p-10">
      <div className="flex bg-gray-300 min-w-[200px] w-full max-w-[1200px] min-h-[600px]">
        <Image
          src="/images/login-background.png"
          alt="login"
          className="w-1/2 hidden md:block object-cover"
          width={500}
          height={400}
        />
        <div className="flex flex-col justify-evenly p-10 md:w-1/2 h-full w-full">
          <div className="">
            <h1 className=" text-4xl mb-5 font-bold">Welcome</h1>
            <p className="text-gray-500 mb-5">
              login to your account with credentials
            </p>
          </div>
          <Form
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Item<FieldType>
              label="Student ID"
              name="userRegNo"
              rules={[
                {
                  required: true,
                  message: "Please input your registration number !",
                },
              ]}
            >
              <Input />
            </Item>
            <Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Password />
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Item>{" "}
            {searchParams?.get("error") && (
              <Item>
                <p className="text-red-500 text-sm w-full flex justify-center ">
                  Invalid Credentials
                </p>
              </Item>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
