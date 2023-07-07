export const revalidate = 0;
import getFeedback from "../../../../action/getFeedback";
import FacultyData from "../../../../components/Report/feedbackdata";

const Report = async() => {
    const docs = await getFeedback();

     if(!docs){
     return null;
 }
  const filteredFeedback  = docs.filter((feedback:any)=> feedback.faculty === "Faculty 1");

    return (
        <div className="flex flex-col items-center justify-center">
            <FacultyData data = {docs}/>
        </div>

  )
}
export default Report;
