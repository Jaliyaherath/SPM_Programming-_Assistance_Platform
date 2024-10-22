/**
 * ExamsPage implementation for lab instructor
 */
import BreadCrumbs from "@/components/common/BreadCrumbs";
import NewExam from "@/components/exams-instructor/NewExam";
import Link from "next/link";
import React from "react";

const NewExamPage: React.FC = () => {
  return (
    <>
      <div style={{ marginLeft: "50px", marginTop: "25px" }}>
        <BreadCrumbs
          linkList={[
            {
              title: <Link href="#">Dashboard</Link>,
            },
            {
              title: <Link href="/instructor/exams">Exams</Link>,
            },
            {
              title: "New Exam",
            },
          ]}
        />
      </div>{" "}
      <br />
      <NewExam />
    </>
  );
};

export default NewExamPage;
