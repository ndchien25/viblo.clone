import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark, ChevronDown, ChevronUp, Facebook, Twitter, Type } from "lucide-react";
import { Link } from "react-router-dom";

type PostActionProps = {
  className?: string;
  vote: number
};

export default function PostAction({ className, vote }: PostActionProps) {
  return (
    <div className={cn("flex flex-col sticky top-0 h-screen items-center justify-center mx-auto py-24", className)}>
      <div className="flex flex-col items-center space-y-1 text-4xl mb-4">
        <Button className={cn('text-gray-400 hover:bg-white bg-white')} aria-label="Upvote">
          <ChevronUp strokeWidth={3} />
        </Button>
        <div className="text-gray-400 text-2xl">
          <span>{vote}</span>
        </div>
        <Button className={cn('text-gray-400 hover:bg-white bg-white')} aria-label="Downvote">
          <ChevronDown strokeWidth={3} />
        </Button>
      </div>
      <div className="mb-8">
        <Button className={cn('text-gray-500 border-gray-500 p-2 hover:bg-slate-200 bg-white rounded-full hover:text-blue-400 hover:border-blue-400 border-[3px]')} title="Bookmark this post">
          <Bookmark size={18} strokeWidth={3} />
        </Button>
      </div>
      <div className="mb-8">
        <Button className={cn('text-gray-400 p-3 hover:bg-slate-300 bg-white rounded-full border')} aria-label="Type">
          <Type size={16} strokeWidth={1} />
        </Button>
      </div>
      <Button className={cn('text-gray-400 border-gray-300 p-4 hover:bg-white leading-none bg-white rounded-full border mb-2 h-0 w-0')} title="Share on Facebook">
        <Link to="/">
          <Facebook size={15} strokeWidth={1} />
        </Link>
      </Button>
      <Button className={cn('text-gray-400 border-gray-300 p-4 hover:bg-white leading-none bg-white rounded-full border h-0 w-0')} title="Share on Twitter">
        <Link to="/">
          <Twitter size={15} strokeWidth={1} />
        </Link>
      </Button>
    </div>
  );
}
