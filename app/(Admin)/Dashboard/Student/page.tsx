export const revalidate = 0;
import React from "react";
import StudentTable from "../../../../components/Table/table";
import Form from "components/form";
import getStudent from "../../../../action/getStudent";

const Student = async () => {

    const docs = await getStudent();
    if(!docs){
        return null;
    }
    return (
        <>
            <div>
                 <Form type="register"/>
            </div>
            <div className="flex flex-col items-center justify-center">
                <StudentTable studentData={docs}/>
            </div>
        </>
    );
};

export default Student;
