import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDate } from "@/helpers/changeDate";
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
import { authAtom, userAtom } from "@/atoms/authAtoms";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentChildService } from "@/services/CommentService";
import { useEffect, useState } from "react";
import { Comment } from "@/models/Comment";
import React from "react";
import { CommentForm } from "./CommentForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "../ui/button";
interface CommentProps {
  comment: Comment;
  isRootComment?: boolean;
}

export const ContainerComment = ({ comment, isRootComment }: CommentProps) => {
  const [auth] = useAtom(authAtom)
  const formattedDate = comment.updated_at ? formatDate(comment.updated_at.toString()) : "N/A";
  const [user] = useAtom(userAtom);
  const isCurrentUser = user?.id === comment.user_id;
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);


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

  const handleUpdateComment = () => {
    setIsEditing(false);
  };
  useEffect(() => {
    if (showReplyForm) {
      setCommentContent(`@${comment.user.username}`)
    }
  }, [comment.user.username, showReplyForm])

  const toggleReplyForm = () => {
    if (isEditing) {
      setIsEditing(false);  // Disable editing when showing replies
    }
    setShowReplyForm(!showReplyForm);
  };

  const toggleEditing = () => {
    if (showReplyForm) {
      setCommentContent(comment.content)
      setShowReplyForm(false);  // Disable replies when editing
    }
    setIsEditing(!isEditing);
  };
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-[#9b9b9b] text-sm">
                      {formatDate(formattedDate)}
                    </span></TooltipTrigger>
                  <TooltipContent>
                    <p>{formattedDate}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-5">
        {isEditing ? (
          <CommentForm
            commentContent={commentContent}
            setCommentContent={setCommentContent}
            commentId={comment.id}
            postId={comment.post_id}
            setShowReplies={setShowReplies}
            parentId={comment.parent_id}
            setIsEditing={setIsEditing}
          />
        ) : (
          <MarkdownViewer content={comment.content} className="prose-stone prose-pre:bg-[#f1f2f3] prose-pre:border-[1px] prose-pre:text-black" />
        )}
      </div>

      <footer className="flex items-center text-[#9b9b9b] text-sm">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-[#9b9b9b] text-sm">
                  <ChevronUp size={14} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bạn cần 50 điểm reputations để vote</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="mx-1">1</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="mr-2">
                <span className="text-[#9b9b9b] text-sm">
                  <ChevronDown size={14} />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bạn cần 50 điểm reputations để vote</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span>|</span>
        {auth && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant={'link'} onClick={toggleReplyForm} className="hover:underline text-blue-300">Trả lời</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trả lời</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <div className="relative mr-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link to={`/c/${comment.id}`}>Chia sẻ</Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chia sẻ đường dân của bình luận này</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {auth && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-0"><Ellipsis /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {isCurrentUser ? (
                  <>
                    {isEditing ? (
                      <>
                        <DropdownMenuItem onClick={handleUpdateComment}>
                          <WandSparkles className="mr-2 h-4 w-4" />
                          <span>Lưu</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsEditing(false)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Hủy</span>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={toggleEditing}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Xóa bình luận này</span>
                        </DropdownMenuItem>
                      </>
                    )}
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
        )}

      </footer>

      {showReplyForm &&
        <CommentForm setShowReplyForm={setShowReplyForm} postId={comment.post_id} parentId={comment.id} commentContent={commentContent} setCommentContent={setCommentContent} setShowReplies={setShowReplies}/>
      }

      {comment.row_count > 0 &&
        <div className="flex flex-col my-2 font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
          <button onClick={() => setShowReplies(true)} className="flex items-center">
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
