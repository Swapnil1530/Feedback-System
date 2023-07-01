
import * as process from "process";
import prisma from "@/lib/prisma";


export async function getStudentData(){
    const res = await prisma.user.findMany({});
    return res;
}

export async function getFeedbackData(){
    const res = await prisma.feedback.findMany({});
    return res;
}
// export  async function getStudent():Promise<user>{
//     const res = await fetch(`${process.env.BASE_URL}/api/Admin`,{cache : "no-cache"});
//     return res.json();
// }
//
// export  async function getFeedback():Promise<user>{
//     const data = await fetch(`${process.env.BASE_URL}/api/feedback`);
//     return data.json();
// }