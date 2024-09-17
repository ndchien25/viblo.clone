import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CommentWithReplies } from "@/models/Comment"; // Updated import
import { formatDate } from "@/helpers/changeDate";
import { ToolTip } from "../Tooltip";
import MarkdownViewer from "../MarkdownViewer";
import { ChevronDown, ChevronUp, Ellipsis, Flag, Pencil, Trash, WandSparkles } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/authAtoms";
import { cn } from "@/lib/utils";

interface CommentProps {
  comment: CommentWithReplies;
  isRootComment?: boolean;
}

export const ContainerComment = ({ comment, isRootComment }: CommentProps) => {
  const formattedDate = comment.updated_at ? formatDate(comment.updated_at.toString()) : "N/A";
  const [currentUser] = useAtom(userAtom);
  const isCurrentUser = currentUser?.id === comment.user_id;

  return (
    <div className={cn("p-6 rounded", {
      'border-[#d6d6d7] border mb-4': isRootComment,
      'border-t border-gray-200': !isRootComment
    })}>
      <header data-comments="1" className="flex gap-2 break-words">
        <div className="flex mb-4">
          <Link to="/" className="relative flex flex-col">
            <Avatar className="mx-2">
              <AvatarImage src={comment?.user?.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <div className="hover:underline">
            <Link to="/">
              <span className="font-bold mr-1 text-blue-500 text-sm">{comment?.user?.display_name}</span>
              <span className="text-[#9b9b9b] mr-1 text-sm">{`@${comment?.user?.username}`}</span>
            </Link>
            <div className="break-words leading-none">
              <ToolTip id={`comment-${comment.id}`} content={formattedDate}>
                <span className="text-[#9b9b9b] text-sm">
                  {formatDate(formattedDate)}
                </span>
              </ToolTip>
            </div>
          </div>
        </div>
      </header>
      <div className="mb-5">
        <div className="overflow-hidden">
          <MarkdownViewer content={comment.content} className="prose-stone prose-pre:bg-[#f1f2f3] prose-pre:border-[1px] prose-pre:text-black" />
        </div>
      </div>
      <footer className="flex items-center text-[#9b9b9b] text-sm">
        <div>
          <ToolTip id={`population-1`} content="Bạn cần 50 điểm reputations để vote">
            <ChevronUp size={14} className="text-slate-400" />
          </ToolTip>
          <span className="mx-1">1</span>
          <ToolTip id={`population-1`} content="Bạn cần 50 điểm reputations để vote">
            <ChevronDown size={14} className="text-slate-400" />
          </ToolTip>
        </div>
        <span className="mx-2">|</span>
        <ToolTip id={`replay-comment`} content="Trả lời">
          <button className="hover:underline text-blue-300 mr-2">Trả lời</button>
        </ToolTip>
        <div className="relative mr-2">
          <ToolTip id={`share-comment`} content="Chia sẻ đường dân của bình luận này">
            <Link to={`/c/${comment.id}`}>Chia sẻ</Link>
          </ToolTip>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-0"><Ellipsis /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {isCurrentUser ? (
                <>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Sửa</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Xóa bình luận này</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Báo cáo</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <WandSparkles className="mr-2 h-4 w-4" />
              <span>Bôi màu code tự động</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </footer>
      {comment.replies && comment.replies.length > 0 &&
        <div className="flex flex-col my-2 font-bold text-blue-600 hover:text-blue-800 cursor-pointer items-center">
          <span className="flex items-center">
            <ChevronDown size={14}/>
            Xem thêm (4)
          </span>
        </div>}
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-6">
          {comment.replies.map((reply: CommentWithReplies) => (
            <ContainerComment
              key={reply.id}
              comment={reply}
              isRootComment={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
