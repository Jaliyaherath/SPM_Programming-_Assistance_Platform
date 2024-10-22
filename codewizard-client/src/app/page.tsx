"use client";
import LabsHorizontalView from "@/components/Labs/LabsHorizontalView";
import theme from "@/theme/themeConfig";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl h-full p-3 flex flex-col gap-4">
      <LabsHorizontalView />
    </div>
  );
}
