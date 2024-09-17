import { Link, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from "../ui/card";
import { MessageCircle } from "lucide-react";
import { useAtom } from "jotai";
import { authAtom } from "@/atoms/authAtoms";
import { CommentForm } from "./CommentForm";
import { createCommentService, getCommentService } from "@/services/CommentService";
import { ContainerComment } from "./ContainterComment";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Comment } from "@/models/Comment";

interface PostCommentProps {
  postId: number;
}
interface CommentCreate {
  post_id: number;
  content: string;
  type: 'question' | 'post';
  parent_id: number | null;
}
export const PostComment: React.FC<PostCommentProps> = ({ postId }) => {
  const [auth] = useAtom(authAtom);
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['GetComment', postId],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => getCommentService(postId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data) {
      setComments(data.pages.flatMap(page => page.comments));
    }
  }, [data]);
  const { mutate } = useMutation({
    mutationFn: async (data: CommentCreate) => createCommentService(data),
  });


  if (isLoading && !isFetching) return <div>Loading...</div>;

  const handleCommentSubmit = (commentContent: string, commentParentId: number | null) => {
    if (!auth) {
      return navigate('/login');
    }
    const payload: CommentCreate = {
      post_id: postId, // Ensure to replace this with the correct post_id
      content: commentContent,
      type: 'post',
      parent_id: commentParentId
    };
    mutate(payload, {
      onSuccess: () => {
        setCommentContent('')
        queryClient.invalidateQueries({ queryKey: ['GetComment', postId] })
      },
    });
  };

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
          <CommentForm onCommentSubmit={handleCommentSubmit} commentContent={commentContent} setCommentContent={setCommentContent} />

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
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="text-blue-500 bg-white hover:text-blue-700 font-semibold w-full border p-3 hover:bg-blue-300"
              >
                {isFetchingNextPage ? 'Loading more...' : 'Xem thêm'}
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};
