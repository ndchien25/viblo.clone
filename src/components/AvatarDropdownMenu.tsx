import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"; // Import from your dropdown library
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building, FileText, History, LogOut, Settings, User } from 'lucide-react';

export default function AvatarDropdownMenu() {
  const [user] = useState({
    name: 'John Doe',
    avatar: 'path-to-avatar-image.png', // Replace with the actual path to the avatar image
    email: 'john.doe@example.com'
  });

  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
  };

  const handleProfile = () => {
    // Handle profile navigation here
    console.log("Navigate to profile");
  };

  const handleSettings = () => {
    // Handle settings navigation here
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
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <Button variant="outline" size="sm" className='h-auto py-2'><Link to="/" className='text-xs leading-none'>Edit</Link></Button>
          </div>
        </div>
        <DropdownMenuSeparator className="m-0 bg-slate-300" />
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">
          <User className="mr-2 h-4 w-4" />
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
