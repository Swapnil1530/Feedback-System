

export const dynamic = "force-dynamic";
import FacultyData from "../../../../components/Report/feedbackdata";
import {getFeedbackData} from "@/lib/query";


const Report =async () => {
    const docs = await getFeedbackData();
 if(!docs){
     return null;
 }
  const filteredFeedback = docs.filter(feedback => feedback.faculty === "Faculty 1");

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-black">Feedback</h1>

            <FacultyData data = {docs}/>
        </div>

  )
}
export default Report;
