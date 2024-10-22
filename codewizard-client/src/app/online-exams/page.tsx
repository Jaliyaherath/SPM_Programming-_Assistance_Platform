/**
 * OnlineExamsPage implementation for students
 */
import BreadCrumbs from "@/components/common/BreadCrumbs";
import ExamsDashboard from "@/components/exams-students/ExamsDashboard";
import Link from "next/link";

export default function OnlineExamsPage() {
  return (
    <>
      {/* <center>
        <div>Exams</div>
      </center> */}
      <div style={{ marginLeft: "50px", marginTop: "25px" }}>
        <BreadCrumbs
          linkList={[
            {
              title: <Link href="#">Home</Link>,
            },
            {
              title: "Exams",
            },
          ]}
        />
      </div>{" "}
      <br />
      <ExamsDashboard />
    </>
  );
}
