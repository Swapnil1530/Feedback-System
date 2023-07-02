import React from 'react'
import {db} from "@/lib/prisma";

const Report =async () => {

const docs = await db.feedback.findMany();
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
