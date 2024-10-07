import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Bookmark, Ellipsis, Facebook, MessagesSquare, Pencil, Star, Twitter, UserPlus, View } from "lucide-react";
import { Post } from "@/models/Post";
import MarkdownViewer from "@/components/MarkdownViewer";
import TagsList from "@/components/tag/TagList";
import Skeleton from "../Skeleton";
import { formatDate } from "@/helpers/changeDate";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PostDetailProps {
  post: Post | null;
  comment_count: number
  loading: boolean;
  error: string | null;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, loading, error, comment_count }) => {
  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center text-red-500">No post found</div>;
  }

  return (
    <>
      <header>
        <div className="w-full flex flex-row">
          <div className="flex gap-2 break-words">
            <div className="flex relative flex-col">
              <Link to={`/u/${post.user.username}`} className="relative flex flex-col">
                <Avatar>
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </div>
            <div className="mr-1 leading-6">
              <div className="flex gap-3 mb-2">
                <div className="flex items-center flex-wrap">
                  <Link to={`/u/${post.user.username}`} className="font-bold text-[#5488c7] mr-1">{post.user.display_name}</Link>
                  <span className="text-[#9b9b9b] mr-1">{`@${post.user.username}`}</span>
                  <Button variant="outline" className="text-xs h-7">Theo dõi</Button>
                </div>
              </div>
              <div className="flex gap-[10px]">
                <span className="max-h-5 flex items-center" title="Reputations: ">
                  <Star className="mr-1" size={16} opacity={0.5} />
                  <span>1000</span>
                </span>
                <span className="max-h-5 flex items-center" title="Người theo dõi">
                  <UserPlus className="mr-1" size={16} opacity={0.5} />
                  {post.user.followers_count || 0}
                </span>
                <span className="max-h-5 flex items-center" title="Bài viết">
                  <Pencil className="mr-1" size={16} opacity={0.5} />
                  7
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap items-end flex-1 text-[#9b9b9b]">
            <div className="items-center" title="thg 9 6, 10:01 SA">
              {post.created_at ? formatDate(post.created_at.toString()) : "N/A"}
              <span title="10 phút đọc" className="font-normal before:content-['-'] before:mx-2">10 phút đọc</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 flex text-gray-500 p-2" title="Lượt xem: 46">
                <View />
                <span>{post.view_count || 0}</span>
              </div>
              <div className="mr-2 text-gray-500" title="Di chuyển đến bình luận">
                <Button variant={'ghost'} className="flex hover:bg-white text-gray-500">
                  <MessagesSquare />
                  <span>{comment_count}</span>
                </Button>
              </div>
              <div className="text-gray-500" title="Xem danh sách người bookmark">
                <Button variant={'ghost'} className="flex hover:bg-white text-gray-500">
                  <Bookmark />
                  <span>0</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <h1 id={post.slug} className="break-words font-bold text-5xl leading-tight">{post.title}</h1>
      </header>
      <div className="flex justify-between mt-4">
        {post?.tags?.length ? (
          <TagsList tags={post.tags || []} />
        ) : (
          <div className="flex-1" />
        )}
        <div className="ml-auto">
          <Button variant={'ghost'} className="bg-white text-slate-400 hover:bg-white" title="Hiển thị các hành động">
            <Ellipsis size={30} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className="flex-auto mt-4">
        <MarkdownViewer content={post.content || ''} className="prose-stone prose-pre:bg-[#f1f2f3] prose-pre:border-[1px] prose-pre:text-slate-500 prose-lead:leading-none" />
      </div>
      <div className="flex justify-between items-center mt-4">
        {post?.tags?.length ? (
          <TagsList tags={post.tags || []} />
        ) : <div />}
        <p
          title="People cannot distribute, remix, adapt, and build upon this work without author's permission (or as permitted by fair use)."
          className="text-slate-500 mb-4 ml-auto"
        >
          All rights reserved
        </p>
      </div>

      <div className="flex items-center justify-end mb-2">
        <div className="mr-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant={'ghost'} className="text-gray-400 border-gray-300 hover:bg-white">
                  <Link to="/">
                    <Facebook size={20} strokeWidth={1.5} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmark bài viết này</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant={'ghost'} className="text-gray-400 border-gray-300 hover:bg-white" title="Bookmark bài viết này">
            <Link to="/">
              <Twitter size={20} />
            </Link>
          </Button>
        </div>
        <div>
          <Button variant={'ghost'} className="bg-white text-slate-400 hover:bg-white" title="Hiện thị các hành động">
            <Ellipsis size={30} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
