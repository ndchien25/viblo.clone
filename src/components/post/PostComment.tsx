import { Link } from "react-router-dom"
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from "../ui/card"
import { Image, MessageCircle, MessageCircleQuestionIcon, Smile } from "lucide-react"
import { useAtom } from "jotai"
import { authAtom } from "@/atoms/authAtoms"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import dataEmoji from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import MarkdownViewer from "../MarkdownViewer"
import { getCommentService } from "@/services/CommentService";
import { ContainerComment } from "./ContainterComment";

interface PostCommentProps {
  onCommentSubmit: (commentContent: string, commentParentId: number | null) => void;
  postId: number;
}
export const PostComment: React.FC<PostCommentProps> = ({ onCommentSubmit, postId }) => {
  const [auth] = useAtom(authAtom)
  const [commentContent, setCommentContent] = useState<string>("");
  const adjustTextareaHeight = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };
  const [showPreview, setShowPreview] = useState(false)
  const handleEmojiSelect = (emoji: { native: string }) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd

      const newValue = commentContent.slice(0, start) + emoji.native + commentContent.slice(end)
      setCommentContent(newValue)
      // Set the cursor position after the emoji
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + emoji.native.length
          adjustTextareaHeight(textareaRef.current)
        }
      }, 0)
    }
  }
  const handlePreviewToggle = () => {
    setShowPreview(!showPreview)
  }
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const maxCommentLength = 512;

  const isCommentTooLong = commentContent.length > maxCommentLength;

  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['GetComment', postId],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => getCommentService(postId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : undefined;
    },
  });
  const comments = data?.pages.flatMap(page => page.comments) || [];
  
  if (isLoading && !isFetching) return <div>Loading...</div>;
  return (
    <>
      <p className="mb-4 font-bold text-xl">Bình luận</p>
      {!auth ? (
        <Link to="/login">
          <Card className="flex items-center justify-center mb-4 p-4 bg-gray-100">
            <CardContent className="flex items-center gap-2 text-gray-600">
              <MessageCircle size={16} />
              Đăng nhập để bình luận
            </CardContent>
          </Card>
        </Link>
      ) : (
        <>
          <Card className="mb-4">
            <CardHeader className="p-4">
              <ul className="flex border-b border-gray-200">
                <li className="mr-4">
                  <button className={cn("text-gray-600 hover:text-blue-500 pb-2", !showPreview ? 'border-blue-500 border-b-2' : '')}
                    onClick={() => setShowPreview(false)}
                  >Viết</button>
                </li>
                <li>
                  <button className={cn("text-gray-600 hover:text-blue-500 pb-2", showPreview ? 'border-blue-500 border-b-2' : '')}
                    onClick={handlePreviewToggle}
                  >Xem trước</button>
                </li>
              </ul>
            </CardHeader>
            <CardContent className="p-4">
              {!showPreview ? (
                <div className="flex gap-2 mb-4">
                  <Link to="/u/ndchien2402" className="mr-2">
                    <img
                      src="https://images.viblo.asia/avatar/b005e7fb-6f4d-44df-a4f6-87350a1680ac.jpg"
                      srcSet="https://images.viblo.asia/avatar-retina/b005e7fb-6f4d-44df-a4f6-87350a1680ac.jpg 2x"
                      alt="Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </Link>
                  <div className="w-full flex flex-wrap relative">
                    <Textarea
                      name="comment_contents"
                      placeholder="Viết bình luận..."
                      className="overflow-hidden break-words h-auto resize-none min-h-32 pt-2 pr-9 pb-8 pl-2 focus-visible:ring-offset-0"
                      value={commentContent}
                      ref={textareaRef}
                      onChange={(e) => {
                        setCommentContent(e.target.value)
                        adjustTextareaHeight(e.target)
                      }}
                    />
                    {isCommentTooLong && (
                      <p className="text-red-500 mb-2">
                        Bình luận của bạn đã vượt quá giới hạn {maxCommentLength} ký tự ({commentContent.length}/{maxCommentLength}).
                      </p>
                    )}
                    <div className="flex items-center mt-2 absolute top-0 right-0 m-3 flex-col text-gray-400">
                      <Popover>
                        <PopoverTrigger>
                          <button className="py-2" tabIndex={0} title="Biểu tượng cảm xúc đề xuất">
                            <Smile size={19} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                          <Picker data={dataEmoji} onEmojiSelect={handleEmojiSelect} />
                        </PopoverContent>
                      </Popover>

                      <button className="py-2" title="Kéo hình ảnh hoặc nhấp để đính kèm">
                        <Image size={19} />
                      </button>
                      <div>
                        <button className="py-2" title="Hỗ trợ Markdown">
                          <MessageCircleQuestionIcon size={19} />
                        </button>
                      </div>
                      {/* <div className="mt-4 text-gray-500 hidden">Không có gì để xem trước!</div> */}

                    </div>
                  </div>
                </div>
              ) : (
                commentContent ? (
                  <div className="flex-1 gap-2 mb-4">
                    <MarkdownViewer content={commentContent} className="prose-stone prose-pre:bg-[#f1f2f3] prose-pre:border-[1px] prose-pre:text-black prose-lead:leading-none" />
                  </div>
                ) : (
                  <p>Không có gì để xem trước</p>
                )
              )}
              <div className="flex justify-end">
                <Button onClick={() => onCommentSubmit(commentContent, null)} className="hover:bg-slate-500">
                  Bình luận
                </Button>
              </div>
            </CardContent>

            <div className="mt-4"></div>

          </Card>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <ContainerComment key={comment.id} comment={comment} isRootComment={comment.parent_id === null} />
            ))
          ) : (
            <Card className="flex items-center justify-center mb-4 rounded-lg shadow-md">
              <CardContent className="flex items-center gap-2 text-gray-600 p-2">
                <MessageCircle size={16} />
                Chưa có bình luận nào.
              </CardContent>
            </Card>
          )}
          {hasNextPage && (
            <div className="flex justify-center my-4">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                {isFetchingNextPage ? 'Loading more...' : 'Xem thêm'}
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
