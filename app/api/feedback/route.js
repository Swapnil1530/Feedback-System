import { NextResponse , NextRequest } from "next/server";  
import prisma from "@/lib/prisma";





export async function POST(req, res) {
    const body = await req.json();
    const { prnNumber ,faculty ,answers ,subject } = body;
   
    const datas = await prisma.feedback.create({
        data: {
            prnNumber,
            faculty,
            subject,
            feedback: answers
        }
    })
   await prisma.user.update({where:{prnNumber},data:{hasSubmitted:true}   }) 
      
    return NextResponse.json({message : "Feedback Saved Sucessfully"}, {status: 201});
}