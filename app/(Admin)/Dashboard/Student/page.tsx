
import StudentTable from "../../../../components/table";
import Form from "components/form";
// import {getStudent} from "@/lib/query";
import * as process from "process";

const getStudentData =async () =>{
    const res = await fetch(`${process.env.BASE_URL}/api/Admin`);
    return res.json();
}
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
