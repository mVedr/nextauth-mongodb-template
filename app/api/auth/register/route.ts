import { connectToDb } from "@/app/helper/server_helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json(
        {
          message: "Invalid username or password",
        },
        {
          status: 422,
        }
      );

    const hsh = await bcrypt.hash(password, 12);

    await connectToDb();
    const newUser = await prisma.user.create({
      data: { email, name, hashPassword: hsh },
    });

    return NextResponse.json({ newUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
