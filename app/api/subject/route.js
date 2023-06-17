import { NextResponse } from "next/server";

export async function GET(req, res) { 
    const subjectData = subject.map((subject) => {
        return {
          id: subject.id,
          name: subject.name
        };
    })
    return NextResponse.json(subjectData, {status: 200});

   
}
const subject = [{
    "id": "1",
    "name": "subject 1"
},{
    "id": "2",
    "name": "subject 2"
}]