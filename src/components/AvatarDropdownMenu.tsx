import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Building, FileText, History, LogOut, Settings, UserRound } from 'lucide-react';
import { User } from "@/models/User";
import { logout } from "@/services/AuthService";
import { useToast } from "./ui/use-toast";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "@/atoms/authAtoms";
import { useMutation } from "@tanstack/react-query";

interface AvatarDropdownMenuProps {
  user: User | null
}

export default function AvatarDropdownMenu({ user }: AvatarDropdownMenuProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [, setAuth] = useAtom(authAtom);

  // React Query mutation for logout
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      if (!response?.data?.error) {
        toast({
          variant: "success",
          title: response?.data?.message,
        });
        setUser(null);
        setAuth(false);
        navigate("/newest");
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Đăng xuất thất bại",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleProfile = () => {
    console.log("Navigate to profile");
  };

  const handleSettings = () => {
    console.log("Navigate to settings");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <div className="flex items-center space-x-2 bg-slate-100 p-2">
          <Avatar className="w-14 h-14">
            <AvatarImage src={user?.avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg text-blue-400">{user?.display_name}</p>
            <p className="text-sm text-gray-500">{'@' + user?.username}</p>
            <Button variant="outline" size="sm" className='h-auto py-2'><Link to="/" className='text-xs leading-none'>Edit</Link></Button>
          </div>
        </div>
        <DropdownMenuSeparator className="m-0 bg-slate-300" />
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">
          <UserRound className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">
          <FileText className="mr-2 h-4 w-4" />
          <span>My content</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">
          <History className="mr-2 h-4 w-4" />
          <span>History</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">
          <Building className="mr-2 h-4 w-4" />
          <span>Organization</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="m-0 bg-slate-300" />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:bg-red-100 rounded-lg p-2">
          <LogOut className="mr-2 h-4 w-4" />
          <span>LogOut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
