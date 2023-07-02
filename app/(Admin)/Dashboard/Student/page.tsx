import * as process from "process";

export const dynamic = "force-dynamic";
import StudentTable from "../../../../components/table";
import Form from "components/form";

// import {db} from "@/lib/prisma"

const getStudentData = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/user`);
    return res.json();
}

const Student = async () => {
    const docs = await getStudentData();
    // const docs = await db.user.findMany();
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
