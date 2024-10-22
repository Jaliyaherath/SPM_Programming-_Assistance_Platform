"use client";
import React, { useContext } from "react";
import { LabContext } from "@/context/LabProvider";
import { LabContextType } from "@/types/LabTypes";
import Link from "next/link";
import { useParams } from "next/navigation";

const Lab = () => {
  const { labs } = useContext(LabContext) as LabContextType;

  return (
    <div className="mx-auto max-w-screen-xl p-3 flex flex-col gap-4 h-full">
      <h3 className="text-4xl">Lab Sessions</h3>
      <div className="flex">
        {/* <ul className="flex flex-col gap-4 w-1/5">
          <li className="">Year 1</li>
          <li>Year 2</li>
          <li>Year 3</li>
          <li>Year 4</li>
        </ul> */}
        <div className="flex flex-col gap-4 w-full">
          {labs.map((lab) => (
            <Link href={`/labs/${lab._id}`} key={lab._id}>
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
      </div>
    </div>
  );
};

export default Lab;
