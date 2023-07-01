import { NextResponse, NextRequest } from "next/server";
import {db} from "../../../lib/prisma"

export async function GET(req,res){
  try {
    const data = await db.feedback.findMany({});
    return NextResponse.json(data,{status:200})
  } catch (error) {
    throw new Error(error);
  }
   

}

export async function POST(req, res) {
  const body = await req.json();
  const { prnNumber, faculty, answers, subject } = body;

  const datas = await prisma.feedback.create({
    data: {
      prnNumber,
      faculty,
      subject,
      feedback: answers,
    },
  });
  await prisma.user.update({
    where: { prnNumber },
    data: { hasSubmitted: true },
  });

  return NextResponse.json(
    { message: "Feedback Saved Sucessfully" },
    { status: 201 }
  );
}

