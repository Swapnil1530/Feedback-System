import {db} from "@/lib/prisma";

import { hash } from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { name ,prnNumber, password } = await req.json();
  const exists = await db.user.findFirst({
    where: {
     prnNumber
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await db.user.create({
      data: {
        name,
        prnNumber,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
