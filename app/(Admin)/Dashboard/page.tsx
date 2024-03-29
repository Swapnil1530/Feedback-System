export const revalidate = 0;
import React from "react";
import HomeTable from "../../../components/Table/home-table";
import getStudent from "../../../action/getStudent";

const DashboardHome = async () => {
  const docs = await getStudent();

  if (!docs) {
    return null;
  }
  const TotalStudent = docs.length - 1;
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
