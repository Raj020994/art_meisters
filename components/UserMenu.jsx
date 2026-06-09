"use client"
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

const UserMenu = ({ user }) => {
    const {res,fn:logginOut,loading}= useFetch(logOutUser);
    const handleLogOut=async()=>{
        await logginOut();
          if (res?.Success) {
        router.push("/");
        router.refresh();
    }
    }
  return (
    <DropdownMenu>
   <DropdownMenuTrigger asChild>

  <button className="flex items-center justify-center h-10 w-10 rounded-full overflow-hidden">
      <Image
        src={user?.Data?.Image?.String||"/default.jpeg"}
        alt="profile"
        fill
        className="object-cover"
      />
    
  </button>

</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/u/${user?.ID}`}>
            My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogOut} className={"hover:text-red-950 text-red-800"}>Log Out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
