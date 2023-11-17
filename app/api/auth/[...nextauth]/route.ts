import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "../../../helper/constants";
import { connectToDb } from "@/app/helper/server_helpers";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "creds",
      credentials: {
        email: { label: "Email", placeholder: "Enter Email" },
        password: { label: "Password", placeholder: "Enter Password" },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        try {
          await connectToDb();
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });
          if (!user?.hashPassword) {
            return null;
          }
          const pwd = user?.hashPassword ?? "abc";
          const ok = await bcrypt.compare(credentials.password, pwd);
          if (ok) {
           return  user;
          }
          return null;
        } catch (error) {
        } finally {
          await prisma.$disconnect();
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
