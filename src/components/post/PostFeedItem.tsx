import { formatDate } from "@/helpers/changeDate";
import { Post } from "@/models/Post"
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ToolTip } from "../Tooltip";
import { Bookmark, ChevronsUpDown, Eye, Link2, MessageCircle } from "lucide-react";
import TagsList from "../tag/TagList";

interface PostFeedItemProps {
  post: Post;
}
export const PostFeedItem: React.FC<PostFeedItemProps> = ({ post }) => {
  const copyToClipboard = () => {
    const postUrl = `${window.location.origin}/p/${post.slug}`; // Adjust the URL format as needed

    navigator.clipboard.writeText(postUrl)
  };
  return (
    <div key={post.id} className="flex items-start p-2 border-b-2">
      <Link to={`/u/${post?.user?.username}`} className="flex flex-col mr-2 items-center justify-center">
        <Avatar>
          <AvatarImage src={post.user.avatar} alt={post.user.username} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div className="w-full ml-2">
        <div className="flex flex-wrap text-sm mb-1 items-center">
          <div className="break-words inline-flex">
            <span className="break-words">
              <Link className="mr-2 text-blue-500 hover:underline" to={`/u/${post.user.username}`}>{post.user.display_name}</Link>
            </span>
          </div>
          <div className="inline-flex flex-wrap items-center text-gray-500 mr-2">
            <ToolTip id={`post-${post.id}`} content={post.created_at ? formatDate(post.created_at.toString()) : "N/A"}>
              <span className="mr-2">{post.created_at ? formatDate(post.created_at.toString()) : "N/A"}</span>
            </ToolTip>
            <ToolTip id={`copy-${post.id}`} content="Sao chép URL">
              <Link2 className="cursor-pointer" size={14} onClick={copyToClipboard} />
            </ToolTip>
          </div>
        </div>
        <div className="flex flex-wrap">
          <h3 className="break-words mr-2 text-lg">
            <Link to={`/p/${post.slug}`} className="hover:text-blue-400"> {post.title}</Link>
          </h3>
          <TagsList tags={post.tags || []} className={"m-0 text-sm"} />
        </div>
        <div className="flex items-center text-slate-600 mt-2">
          <div className="flex text-[16px]">
            <span className="max-h-5 mr-2 flex items-center gap-2">
              <Eye size={16} />
              {post.view_count}
            </span>
            <span className="max-h-5 mr-2 flex items-center gap-2">
              <Bookmark size={16} />
              0
            </span>
            <span className="max-h-5 mr-2 flex items-center gap-2">
              <MessageCircle size={14} />
              {post.comment_count || 0}
            </span>
          </div>
          <div className="flex justify-between flex-grow">
            <div className="flex">
              asdasd
            </div>
            <div className="flex items-center">
              <ChevronsUpDown size={16} />
              {post.vote}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}