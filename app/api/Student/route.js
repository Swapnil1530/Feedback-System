import {db} from "../../../lib/prisma";
import {NextResponse} from "next/server";

export async function GET(){
  try {
      const data = await db.user.findMany({});
      return NextResponse.json(data);
  }
  catch (e) {
      throw new Error(e);
  }
}