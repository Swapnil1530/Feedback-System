import prisma from "./prisma"
export  async function getStudent(){
    const data = await prisma.user.findMany({});
    const json = JSON.stringify(data);
    return JSON.parse(json);
}

export  async function getFeedback(){
    const data = await prisma.feedback.findMany({});
    const json = JSON.stringify(data);
    return JSON.parse(json);
}