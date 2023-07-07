
export const fetchCache = 'force-no-store';
export const revalidate = 2;
import StudentTable from "../../../../components/Table/table";
import Form from "components/form";
// import {getStudentData} from "@/lib/query";


const Student = async () => {
    const getStudentData = async() => {
        try {
            const res = await fetch(`${process.env.BASE_URL}/api/Student`, {cache: 'no-store', next: { revalidate: 0 } })
            if(!res) return null;
            return res.json();
        }catch (error:any) {
            throw new Error(error)
        }
    }
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
