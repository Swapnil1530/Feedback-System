import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req,res){
    const data = await prisma.user.findMany({})
    return NextResponse.json(data, { status: 200 });


}

