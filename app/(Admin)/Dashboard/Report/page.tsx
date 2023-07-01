import React from 'react'
import {getFeedback} from "@/lib/query";



export const dynamic = 'force-dynamic';

export const revalidate = 0;
const Report =async () => {

const docs:any = await getFeedback();
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
