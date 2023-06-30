// import React from 'react'
//
// function getErrorResponse() {
//   return {
//     data :null,
//     error: "Fetching news failed",
//   };
// }
// const feedbackData = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/feedback");
//
//     const output = await res.json();
//     if (!res.ok) {
//       return getErrorResponse();
//     }
//     return output;
//   }catch(err){
//     return getErrorResponse();
//   }
// }
// const Report =async () => {
//   const {data: docs , error} = await feedbackData();
//   if(error){
//     return getErrorResponse();
//   }
//   if(!docs){
//     return getErrorResponse();
//   }
//   // const faculty = docs.filter((student: any)=>student.faculty);
//
//
//   return (
//
//     <div>
//
//       {docs && docs.map((data: any) =>{
//         return(
//           <div key={data.id} className='flex items-center justify-center'>
//             {data.faculty }
//           </div>
//         )
//       })}
//     </div>
//   )
// }
// export default Report;
const Report = () => {
  return (
      <div>Report Page</div>
  )
}
export default Report;