import { connectToDb } from "@/app/helper/server_helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDb();
        const users = await prisma.user.findMany();
        return NextResponse.json({users} , {status: 200});
    } catch (error) {
        return NextResponse.json({message : "Server Error"} , {status: 200});
    }
}