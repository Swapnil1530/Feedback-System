
import StudentTable from "../../../../components/table";
import Form from "components/form";
import {getStudentData} from "@/lib/query";
import {db} from "@/lib/prisma"



const Student = async () => {
    const docs = await db.user.findMany();
    // const docs = await getStudentData();
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
