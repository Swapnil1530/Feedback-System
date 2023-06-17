import { NextRequest , NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from './../auth/[...nextauth]/route';
export async function GET(req, res) {
const session = await getServerSession({ req , authOptions});

 const user = session.user
  return NextResponse.json({message : user.prnNumber});
}
