import * as process from "process";

export const dynamic = "force-dynamic";
import StudentTable from "../../../../components/Table/table";
import Form from "components/form";
import {getStudentData} from "@/lib/query";


const Student = async () => {
    const docs = await getStudentData();
    if(!docs){
        return null;
    }
    return (
        <>

            <Form type="register"/>

            <div className="flex flex-col items-center justify-center">
                <StudentTable studentData={docs}/>
            </div>
        </>
    );
};

export default Student;
