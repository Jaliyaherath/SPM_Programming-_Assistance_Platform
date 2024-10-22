"use client";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Spin } from "antd";
import Link from "next/link";
import React, { useContext } from "react";

const LabsHorizontalView = () => {
  const { labs, loading } = useContext(LabContext) as LabContextType;

  return (
    <div className="my-4">
      <div className="flex flex-between justify-between items-center mb-4">
        <h3 className="text-4xl font-bold">Join a lab session</h3>
        {/* <Link
          href="/labs"
          className="font-bold text-xl underline text-custom-blue-unkown"
          title="All Lab Sessions"
        >
          View All
        </Link> */}
      </div>
      <div className="flex flex-row gap-4 overflow-x-auto overflow-y-visible w-max pb-4">
        {loading && (
          <div>
            <Spin />
          </div>
        )}
        {labs.map((lab) => (
          <Card
            key={lab._id}
            className="flex flex-col justify-center items-center  border-2 border-gray-300 rounded-md shadow-md hover:bg-gray-100 bg-white p-1"
            bodyStyle={{
              width: "250px",
              // height: "200px",
            }}
          >
            <p className="text-gray-600 text-lg">{lab.module}</p>
            <p className=" text-2xl font-bold">{lab.name}</p>
            <p className="text-gray-600 text-sm ">
              {lab.year} year {lab.semester} sem
            </p>
            <Link href={`/labs/${lab._id}`}>
              <button className="w-full mt-2 bg-custom-blue-unkown hover:bg-[#00949D] text-white font-bold py-2 px-4 rounded cursor-pointer">
                Join
              </button>
            </Link>
          </Card>
        ))}
        <Card
          className="flex flex-col justify-center items-center border-2 border-gray-300 rounded-md shadow-md hover:bg-gray-100 bg-white p-1"
          bodyStyle={{
            width: "250px",
            textAlign: "center",
          }}
        >
          <Link href={`/labs`} className="text-xl">
            View All <ArrowRightOutlined />
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default LabsHorizontalView;
