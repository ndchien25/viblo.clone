import { AlignLeft, Grip, LogIn } from "lucide-react";
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "@/atoms/authAtoms";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import AvatarDropdownMenu from "../AvatarDropdownMenu";
// import { Link, Outlet } from "react-router-dom";

const AdminHeader: React.FC = () => {
  const [auth,] = useAtom(authAtom);
  const [user,] = useAtom(userAtom)
  return (
    <header className="h-14 w-full bg-white px-4">
      <div className="mx-auto flex items-center justify-between h-full">
        <AlignLeft size={32} />
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none mr-7">
              <div className="relative py-1">
                <div className="-top-1 absolute left-2">
                  <p className="flex h-1 items-center justify-center rounded-full bg-red-400 p-2 text-xs text-white">new</p>
                </div>
                <Grip color="#494141" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <ScrollArea className="h-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </ScrollArea>

              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          {auth && <AvatarDropdownMenu user={user} />}
          {!auth &&
            <Button className="bg-white hover:bg-white text-blue-400 hover:text-blue-300">
              <Link to="/login" className="flex">
                <LogIn size={20} />
                <span className="ml-2">Đăng nhập/đăng ký</span>
              </Link>
            </Button>
          }
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
