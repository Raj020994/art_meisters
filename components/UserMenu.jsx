"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFetch from "@/hooks/useFetch";
import { logOutUser } from "@/service/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/user";
const UserMenu = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const { data:res, fn: logginOut, loading } = useFetch(logOutUser);
  const handleLogOut = async () => { logginOut();
  };
  useEffect(() => {
    if (!loading&&res?.Success) {
      setUser(null);
      router.push(`/sign-in`);
    }
  }, [res]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden">
          <Image
            src={
              user?.Image?.Valid && user?.Image?.String
                ? user.Image.String
                : "/default.jpeg"
            }
            alt="profile"
            fill
            className="object-cover"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/u/${user?.ID}`}>My Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogOut}
            className={"hover:text-red-950 text-red-800"}
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
