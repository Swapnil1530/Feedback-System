import * as process from "process";

export const dynamic = "force-dynamic";
import React from 'react'
import {getFeedbackData} from "@/lib/query";


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
