import { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile, Image, MessageCircleQuestionIcon } from "lucide-react";
import dataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import MarkdownViewer from "../MarkdownViewer";
import { Link } from "react-router-dom";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { userAtom } from "@/atoms/authAtoms";
import { useAtom } from "jotai";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentService, updateCommentService } from "@/services/CommentService";

interface CommentFormProps {
  postId: number
  commentContent: string;
  setCommentContent: (content: string) => void;
  parentId?: number | null;
  setShowReplyForm?: (show: boolean) => void;
  setShowReplies?: (show: boolean) => void;
  commentId?: number;
  setIsEditing?: (show: boolean) => void;
}

interface CommentCreate {
  post_id: number;
  content: string;
  type: 'question' | 'post';
  parent_id: number | null;
}

interface CommentUpdate {
  comment_id: number;
  content: string;
  post_id: number;
}
export const CommentForm: React.FC<CommentFormProps> = ({ setShowReplyForm, parentId, postId, commentContent, setCommentContent, commentId, setIsEditing, setShowReplies }) => {
  const [user] = useAtom(userAtom);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const queryClient = useQueryClient()
  const maxCommentLength = 512;
  const isCommentTooLong = commentContent.length > maxCommentLength;

  const adjustTextareaHeight = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };
  const { mutate: createComment } = useMutation({
    mutationFn: async (data: CommentCreate) => createCommentService(data),
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: async (data: CommentUpdate) => updateCommentService(data),
  });

  const handleCommentSubmit = () => {
    if (commentId) {
      // Update comment
      const payload: CommentUpdate = {
        post_id: postId,
        comment_id: commentId,
        content: commentContent,
      };
      updateComment(payload, {
        onSuccess: () => {
          setCommentContent('');
          setIsEditing?.(false)
          if (!parentId) {
            queryClient.invalidateQueries({ queryKey: ['GetComment', postId] });
          } else {
            setShowReplies?.(true)
            queryClient.invalidateQueries({ queryKey: ['GetCommentChild', parentId] });
          }
        },
      });
    } else {
      // Create new comment
      const payload: CommentCreate = {
        post_id: postId!,
        content: commentContent,
        type: 'post',
        parent_id: parentId || null,
      };
      createComment(payload, {
        onSuccess: () => {
          setCommentContent('');
          setShowReplyForm?.(false)
          if (!parentId) {
            queryClient.invalidateQueries({ queryKey: ['GetComment', postId] });
          } else {
            setShowReplies?.(true)
            queryClient.invalidateQueries({ queryKey: ['GetCommentChild', parentId] });
          }
        },
      });
    }
  };
  const handleEmojiSelect = (emoji: { native: string }) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newValue = commentContent.slice(0, start) + emoji.native + commentContent.slice(end);
      setCommentContent(newValue);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + emoji.native.length;
          adjustTextareaHeight(textareaRef.current);
        }
      }, 0);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="p-4">
        <ul className="flex border-b border-gray-200">
          <li className="mr-4">
            <button
              className={cn(
                "text-gray-600 hover:text-blue-500 pb-2",
                !showPreview ? " border-blue-500 border-b-2" : "")}
              onClick={() => setShowPreview(false)}
            >
              Viết
            </button>
          </li>
          <li>
            <button
              className={cn(
                "text-gray-600 hover:text-blue-500 pb-2",
                showPreview ? " border-blue-500 border-b-2" : "")}
              onClick={() => setShowPreview(true)}
            >
              Xem trước
            </button>
          </li>
        </ul>
      </CardHeader>
      <CardContent className="p-4">
        {!showPreview ? (
          <div className="flex gap-2 mb-4">
            <Link to="/" className="relative flex flex-col">
              <Avatar className="mx-2">
                <AvatarImage src={user?.avatar || ''} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <div className="w-full flex flex-wrap relative">
              <Textarea
                name="comment_contents"
                placeholder="Viết bình luận..."
                className="overflow-hidden break-words h-auto resize-none min-h-32 pt-2 pr-9 pb-8 pl-2 focus-visible:ring-offset-0"
                value={commentContent}
                ref={textareaRef}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                  adjustTextareaHeight(e.target);
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
          {parentId && setShowReplyForm && (
            <Button
              onClick={() => setShowReplyForm(false)}
              className="hover:bg-slate-500 mr-2"
            >
              Hủy
            </Button>
          )}
          {setIsEditing && (
            <Button
              onClick={() => setIsEditing(false)}
              className="hover:bg-slate-500 mr-2"
            >
              Hủy
            </Button>
          )}
          <Button onClick={() => handleCommentSubmit()} className="hover:bg-slate-500">
            Bình luận
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
