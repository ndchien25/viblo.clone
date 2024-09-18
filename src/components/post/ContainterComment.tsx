import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate } from "@/helpers/changeDate";
import { ToolTip } from "../Tooltip";
import MarkdownViewer from "../MarkdownViewer";
import { ChevronDown, ChevronUp, Ellipsis, Flag, Pencil, Trash, WandSparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/authAtoms";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentChildService } from "@/services/CommentService";
import { useEffect, useState } from "react";
import { Comment } from "@/models/Comment";
import React from "react";
import { CommentForm } from "./CommentForm";

interface CommentProps {
  comment: Comment;
  isRootComment?: boolean;
}

export const ContainerComment = ({ comment, isRootComment }: CommentProps) => {
  const formattedDate = comment.updated_at ? formatDate(comment.updated_at.toString()) : "N/A";
  const [currentUser] = useAtom(userAtom);
  const isCurrentUser = currentUser?.id === comment.user_id;
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['GetCommentChild', comment.id],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => getCommentChildService(comment.id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : undefined;
    },
    enabled: showReplies,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (showReplyForm) {
      setCommentContent(`@${comment.user.username}`)
    }
  }, [comment.user.username, showReplyForm])

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
          <button onClick={() => setShowReplyForm(!showReplyForm)} className="hover:underline text-blue-300 mr-2">Trả lời</button>
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

      {showReplyForm &&
        <CommentForm setShowReplyForm={setShowReplyForm} postId={comment.post_id} parentId={comment.id} commentContent={commentContent} setCommentContent={setCommentContent} />
      }

      {comment.row_count > 0 &&
        <div className="flex flex-col my-2 font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
          <button onClick={() => setShowReplies(!showReplies)} className="flex items-center">
            <ChevronDown size={14} className={showReplies ? 'rotate-180' : ''} />
            {!comment.parent_id ? (
              <span>Xem tất cả comment ({comment.row_count})</span>
            ) : (
              <span>Xem tất cả replies comment ({comment.row_count})</span>
            )
            }
          </button>
        </div>
      }

      {showReplies && (
        <div className="pl-6">
          {isLoading || isFetching ? (
            <p>Loading...</p>
          ) : (
            <>
              {data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.comments.map((reply) => (
                    <ContainerComment
                      key={reply.id}
                      comment={reply}
                      isRootComment={false}
                    />
                  ))}
                </React.Fragment>
              ))}
              {hasNextPage && !isFetchingNextPage && (
                <button
                  onClick={() => fetchNextPage()}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Load more
                </button>
              )}
            </>
          )}
        </div>
      )}

    </div>
  );
};
