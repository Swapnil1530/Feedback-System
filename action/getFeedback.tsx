import {db} from "@/lib/prisma";

export default async function getFeedback(){
    try{
        const res = await db.feedback.findMany({});
        if(!res) return null;
        return res;
    }catch (e:any) {
        throw new Error(e)
    }
}