import {db} from "@/lib/prisma";

export default async function getStudent (){
    try {
        const res = await db.user.findMany({});
        if (!res) return null;
        return res;
    }catch (e:any) {
        throw new Error(e)
    }
}