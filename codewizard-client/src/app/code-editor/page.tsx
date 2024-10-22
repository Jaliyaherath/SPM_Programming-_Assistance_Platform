"use client";
import AiChatBot from "@/components/AiChat";
import CodeEditor from "@/components/CodeEditor";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

export default function Home() {
  return (
    <div className="h-screen w-full bg-custom-light-gray relative">
      <AiChatBot />
      <CodeEditor />
    </div>
  );
}
