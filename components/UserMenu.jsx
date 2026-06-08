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
import { User } from "lucide-react";
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

  <button className="relative h-10 w-10 rounded-full overflow-hidden">

    {user?.Data?.Image?.String ? (
      <Image

        src={user?.Data?.Image?.String}

        alt="profile"

        fill

        className="object-cover"

      />

    ) : (

      <User className="text-white" />

    )}

  </button>

</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/u/${user?.Data?.ID}`}>
            My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
