import { NextResponse } from "next/server";


export async function GET(req, res) { 
    const facultyData = [
        {
        id: "1",
        name: "John",
        
       },{
        id: "2",
        name: "Jane",
       
       }]
    return  NextResponse.json(facultyData);
   

   
}
