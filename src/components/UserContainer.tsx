import { Eye, PencilLine, Plus, Star, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface UserContainerProps {
  avatarUrl: string;
  avatarRetinaUrl: string;
  name: string;
  username: string;
  reputations: number;
  posts: number;
  followers: number;
  views: number;
}

export function UserContainer({
  avatarUrl,
  avatarRetinaUrl,
  name,
  username,
  reputations,
  posts,
  followers,
  views
}: UserContainerProps) {
  return (
    <div className="user-container">
      <div className="sidebar__user mb-1">
        <div className="flex mb-2 gap-8">
          <div className="flex flex-col items-center justify-center relative">
            <Link to={`/u/${username}`} className="flex flex-col items-center justify-center relative">
              <img
                src={avatarUrl}
                srcSet={`${avatarRetinaUrl} 2x`}
                alt="Avatar"
                className="w-14 max-w-14 m-auto h-auto rounded-[50px]"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center mt-2">
            <Link to={`/u/${username}`} className="text-lg font-semibold text-gray-800 hover:text-blue-500 hover:underline">
              {name}
            </Link>
            <span className="block text-sm text-gray-500">@{username}</span>
            <div className="mt-2">
              <Button className={cn("bg-white text-blue-500 hover:bg-blue-500 hover:text-white border-blue-500")}>
                <Plus className="inline mr-2" size={12}/>
                Theo dõi
              </Button>
            </div>
          </div>
        </div>
        <div className="stats stats-top-author flex justify-between text-sm text-gray-500 mt-4">
          <span className="w-1/4 text-center" title={`Reputations: ${reputations}`}>
            <Star className="inline mr-1" size={16} />
            {reputations.toLocaleString()}
            
          </span>
          <span className="w-1/4 text-center" title={`Bài viết: ${posts}`}>
            <PencilLine className="inline mr-1" size={16}/>
            {posts}
          </span>
          <span className="w-1/4 text-center" title={`Người theo dõi: ${followers}`}>
            <UserPlus className="inline mr-1" size={16}/>
            {followers.toLocaleString()}
          </span>
          <span className="w-1/4 text-center" title={`Tổng số lượt xem: ${views}`}>
            <Eye className="inline mr-1" size={16}/>
            {views.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
