import NewQuestion from "@/components/questions-instructor/NewQuestion";

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

export default function NewQuestionsPage() {
  return <NewQuestion />;
}
