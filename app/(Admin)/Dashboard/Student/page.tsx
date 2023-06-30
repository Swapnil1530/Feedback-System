
import StudentTable from "../../../../components/table";
import Form from "components/form";
import {getStudent} from "@/lib/query";


const Student = async () => {
    const docs = await getStudent();

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
