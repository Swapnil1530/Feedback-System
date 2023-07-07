


export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
import FacultyData from "../../../../components/Report/feedbackdata";
import {getFeedbackData} from "@/lib/query";


const Report =async () => {

    const getFeedbackData = async() => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/feedback`,  {cache: 'no-store', next: { revalidate: 0 } });
            if (!res) return null;
            return res.json();
        }catch (e:any) {
           throw new Error(e);
        }
    }
    const docs = await getFeedbackData();
 if(!docs){
     return null;
 }
  const filteredFeedback  = docs.filter((feedback:any)=> feedback.faculty === "Faculty 1");

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-black">Feedback</h1>

            <FacultyData data = {docs}/>
        </div>

  )
}
export default Report;
