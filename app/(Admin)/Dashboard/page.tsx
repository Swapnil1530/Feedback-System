

export const dynamic = "force-dynamic";

export const fetchCache = 'force-no-store'
import HomeTable from "../../../components/Table/home-table";
import Report from "@/app/(Admin)/Dashboard/Report/page";
// import {getStudentData} from "@/lib/query";


const DashboardHome = async () => {
  const getStudentData = async() => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/Student`, {cache: "no-store"})
      if (!res) return null;
      return res.json();
    }catch (e:any) {
      throw new Error(e)
    }
  }
const docs = await  getStudentData();

  if(!docs){
    return null;
  }
  const TotalStudent = docs.length;
  const submittedFeedback = docs.filter(
    (data: { hasSubmitted: any }) => data.hasSubmitted
  ).length;
  const remaining = TotalStudent - submittedFeedback;


  return (
    <>
      <div className="flex items-center justify-center mt-4 ">
        <div className="flex flex-col sm:flex-row gap-28">
          <div className="bg-white border-2 rounded font-semibold border-black hover:bg-gray-900 hover:text-white p-8">
            <p className="text-2xl text-center">Total Student</p>
            <h3 className="mt-2 text-blue-800 text-3xl text-center">
              {TotalStudent}
            </h3>
          </div>
          <div className="bg-white border-2 rounded font-semibold border-black hover:bg-gray-900 hover:text-white p-8">
            <p className="text-2xl text-center">Feedback Submitted</p>
            <h3 className="mt-2 text-blue-800 text-3xl text-center">
              {submittedFeedback}
            </h3>
          </div>
          <div className="bg-white border-2 rounded font-semibold border-black hover:bg-gray-900 hover:text-white p-8">
            <p className="text-2xl text-center">Remaining Student</p>
            <h3 className="mt-2 text-blue-800 text-3xl text-center">
              {remaining}
            </h3>
          </div>
        </div>
      </div>
      <div>
        <HomeTable studentData={docs} />

      </div>
    </>
  );
};
export default DashboardHome;