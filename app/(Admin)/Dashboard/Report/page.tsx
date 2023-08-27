export const revalidate = 0;
import React from "react";
import getFeedback from "../../../../action/getFeedback";
import FacultyData from "../../../../components/Report/feedbackdata";

const Report = async () => {
  const docs = await getFeedback();

  if (!docs) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <FacultyData data={docs} />
    </div>
  );
};
export default Report;
