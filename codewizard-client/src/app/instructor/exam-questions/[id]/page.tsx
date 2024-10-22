/**
 * ExamQuestionsPage implementation
 */
"use client";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import AllQuestions from "@/components/questions-instructor/AllQuestions";
import Link from "next/link";

// export async function getStaticPaths() {
//   let examPaths = [];

//   try {
//     const res = await fetch("http://localhost:5000/api/v1/exams");

//     const data = await res.json();

//     const exams = await data.exams;

//     for (let exam of exams) {
//       examPaths.push({ params: { id: exam.id.toString() } });
//     }
//   } catch (err: any) {
//     console.log(err.message);
//   }

//   return {
//     paths: examPaths,
//     fallback: false, // can also be true or 'blocking'
//   };
// }

export default function ExamQuestionsPage() {
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
              title: " Questions",
            },
          ]}
        />
      </div>{" "}
      <br />
      <AllQuestions />
    </>
  );
}
