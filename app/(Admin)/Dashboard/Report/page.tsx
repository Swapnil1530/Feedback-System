import React from 'react'

const feedbackData = async () => {
  const res = await fetch("http://localhost:3000/api/feedback");
  return res.json();
}
const Report =async () => {
  const docs = await feedbackData();
  const faculty = docs.filter((student: any)=>student.faculty);

  return (
    <div>
      {faculty.map((data: any) =>{
        return(
          <div key={data.id} className='flex items-center justify-center'>
            {data.faculty}
          </div>
        )
      })}
    </div>
  )
}
export default Report;
