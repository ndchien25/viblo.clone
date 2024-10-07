import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Building, FileText, History, LogOut, Settings, UserRound } from 'lucide-react';
import { User } from "@/models/User";
import { logout } from "@/services/AuthService";
import { useToast } from "@/hooks/use-toast";
import { useAtom } from "jotai";
import { authAtom, userAtom } from "@/atoms/authAtoms";
import { useMutation } from "@tanstack/react-query";
import { PATHS } from "@/routes/paths";

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
        navigate(PATHS.POSTS.NEWEST);
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Đăng xuất thất bại",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const menuItems = [
    { icon: <UserRound className="mr-2 h-4 w-4" />, label: "Profile", action: () => console.log("Navigate to profile") },
    { icon: <FileText className="mr-2 h-4 w-4" />, label: "My content", action: () => console.log("Navigate to my content") },
    { icon: <History className="mr-2 h-4 w-4" />, label: "History", action: () => console.log("Navigate to history") },
    { icon: <Building className="mr-2 h-4 w-4" />, label: "Organization", action: () => console.log("Navigate to organization") },
    { icon: <Settings className="mr-2 h-4 w-4" />, label: "Settings", action: () => console.log("Navigate to settings") },
  ];

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
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.action} className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="m-0 bg-slate-300" />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:bg-red-100 rounded-lg p-2">
          <LogOut className="mr-2 h-4 w-4" />
          <span>LogOut</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
