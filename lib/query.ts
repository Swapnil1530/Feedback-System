import {db} from "./prisma";


export const getStudentData = async ()=> {
    const data:any= await db.user.findMany();
    return data;
}

export const getFeedbackData = async() => {
    const data = await db.feedback.findMany();
    return data;
}