import * as process from "process";

export const dynamic = "force-dynamic";
import React from 'react'
// import {db} from "@/lib/prisma";

const getFeedbackData = async() => {
    const res = await fetch(`${process.env.BASE_URL}/api/feedback`);
    return res.json();
}
const Report =async () => {
const docs = await getFeedbackData();
// const docs = await db.feedback.findMany();
 if(!docs){
     return null;
 }
  const faculty = docs.filter((student: any)=>student.faculty);

 return (

    <div>

      {docs && docs.map((data: any) =>{
        return(
          <div key={data.id} className='flex items-center justify-center'>
            {data.faculty }
          </div>
        )
      })}
    </div>
  )
}
export default Report;
