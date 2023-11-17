"use client";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { data, status } = useSession();
  const router = useRouter();
  const logout = async () => {
    await signOut();
  };
  const login = async () => {
    router.push("/api/auth/signin");
  };
  return (
    <>
      {status === "authenticated" && <h1>Welcome {data?.user?.name}</h1>}
      {status === "authenticated" && <button onClick={logout}>Logout</button>}
      {status === "unauthenticated" && <button onClick={login}>Login</button>}
    </>
  );
}
