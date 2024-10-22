"use client";
import React, { useContext } from "react";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import Link from "next/link";
const Instructor = () => {
  const { labs } = useContext(LabContext) as LabContextType;
  return (
    <div className="flex flex-col gap-4">
      Instructor Home Page
      {labs.map((lab) => (
        <Link href={`/instructor/labs/${lab._id}`} key={lab._id}>
          <div className="flex p-2  items-center w-full h-20 border-2 border-gray-300 rounded-md shadow-md  hover:bg-gray-100">
            <div className="text-sm font-light">
              <div className="text-2xl font-bold">{lab.name}</div>
              <span className="">Semester {lab.semester}</span>
              {" | "}
              <span className="text-sm font-light">Year {lab.year}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Instructor;
