
import StudentTable from "../../../../components/table";
import Form from "components/form";

const datas = async () => {
    const res = await fetch("http://localhost:3000/api/Admin", {
        cache: 'no-store',
    });
    return res.json();
};

const Student = async () => {
    const docs = await datas();

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
