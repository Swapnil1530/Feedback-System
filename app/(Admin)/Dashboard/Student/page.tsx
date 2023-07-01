
import StudentTable from "../../../../components/table";
import Form from "components/form";
import {getStudent} from "@/lib/query";


export const dynamic = 'force-dynamic';

export const revalidate = 0;
const Student = async () => {
    const docs = await getStudent();
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
