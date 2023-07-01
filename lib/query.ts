import {user} from "../types";
import * as process from "process";




export  async function getStudent():Promise<user>{
    const res = await fetch(`${process.env.BASE_URL}/api/Admin`,{cache : "no-cache"});
    return res.json();
}

export  async function getFeedback():Promise<user>{
    const data = await fetch(`${process.env.BASE_URL}/api/feedback`);
    return data.json();
}