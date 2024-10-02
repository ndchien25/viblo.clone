import { Link } from "react-router-dom";
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, CardContent } from "../ui/card";
import { MessageCircle } from "lucide-react";
import { useAtom } from "jotai";
import { authAtom } from "@/atoms/authAtoms";
import { CommentForm } from "./CommentForm";
import { getCommentService } from "@/services/CommentService";
import { ContainerComment } from "./ContainterComment";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Comment } from "@/models/Comment";

interface PostCommentProps {
  postId: number;
}

export const PostComment: React.FC<PostCommentProps> = ({ postId }) => {
  const [auth] = useAtom(authAtom);
  const [commentContent, setCommentContent] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])
  const [, setShowReplyForm] = useState(false);
  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['GetComment', postId],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => getCommentService(postId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (data) {
      setComments(data.pages.flatMap(page => page.comments));
    }
  }, [data]);

  useEffect(() => {
    const channel = window.Echo.channel(`post.comment.${postId}`);

    const handleCommentCreated = (event: Comment) => {
      if (!event.parent_id) {
        setComments((prevComments) => [event, ...prevComments]);
      } else {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === event.parent_id
              ? { ...comment, row_count: comment.row_count + 1 }
              : comment
          )
        );
      }
    };
  
    channel.listen('.post.comment.created', handleCommentCreated);
  
    return (() => {
      channel.stopListening('.post.comment.created', handleCommentCreated);
      window.Echo.leave(`post.comment.${postId}`)
    })
  }, [postId]);

  if (isLoading && !isFetching) return <div>Loading...</div>;

  return (
    <>
      <p className="mb-4 font-bold text-xl">Bình luận</p>
      {!auth ? (
        <>
          <Link to="/login">
            <Card className="mb-4 bg-gray-100">
              <CardContent className="flex justify-center gap-2 p-3 text-gray-600">
                <MessageCircle size={16} />
                Đăng nhập để bình luận
              </CardContent>
            </Card>
          </Link>

        </>
      ) : (
        <>
          <CommentForm setShowReplyForm={setShowReplyForm} parentId={null} postId={postId} commentContent={commentContent} setCommentContent={setCommentContent} />
        </>
      )}
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
  );
};
