"use client";
import { useAuthStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function layout({ children }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.Role !== "admin") router.push("/");
  }, [user]);

  return <div>{children}</div>;
}