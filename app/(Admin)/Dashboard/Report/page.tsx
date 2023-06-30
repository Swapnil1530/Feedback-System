import React from 'react'
import * as process from "process";


const getFeedbackData = async () => {

    const res = await fetch(`${process.env.BASE_URL}/api/feedback`);

    const json = JSON.stringify(res);

    return JSON.parse(json);


}
const Report =async () => {

const docs = await getFeedbackData();

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
