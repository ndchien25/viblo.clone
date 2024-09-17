import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import PostDetail from '@/components/post/PostDetail';
import PostAction from '@/components/post/PostAction';
import Sidebar from '@/components/Sidebar';
import { PostComment } from '@/components/post/PostComment';
import { authAtom } from '@/atoms/authAtoms';
import extractHeaders from '@/utils/extractHeader';
import Header from '@/models/Header';
import { Post } from '@/models/Post';
import { getPostBySlugService, votePostService } from '@/services/PostService';

interface PostData {
  post: Post | null;
  user_vote: 'up' | 'down' | null;
}


export default function PostDetailPage() {
  const [auth] = useAtom(authAtom);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [headers, setHeaders] = useState<Header[]>([]);

  const { data, isLoading, error, isSuccess } = useQuery<PostData | null, Error>({
    queryKey: ['PostBySlug'],
    queryFn: () => getPostBySlugService(slug as string),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    extractHeaders(data?.post?.content || '').then(setHeaders);
  }, [data, isSuccess])

  const mutation = useMutation({
    mutationFn: async (vote: 'up' | 'down' | null) => { if (data?.post?.id) return votePostService(data?.post?.id, vote || 'none') },
    onError: (error) => {
      console.error('Error updating vote:', error);
    },
  })

  const updateVote = (vote: 'up' | 'down' | null) => {
    if (!auth) {
      return navigate('/login');
    }
    mutation.mutate(vote);
  };

  return (
    <>
      {data?.post ? (
        <div className="max-w-7xl items-center justify-center m-auto px-7 min-h-screen">
          <div className="grid grid-cols-16 pt-4 pb-4 gap-4">
            <div className="col-start-1 col-span-1">
              <PostAction
                user_vote={data.user_vote}
                vote={data.post.vote || 0}
                onVote={(vote) => updateVote(vote)}
              />
            </div>
            <div className="col-start-2 col-end-13">
              <PostDetail
                post={data.post}
                loading={isLoading}
                error={error ? error.message : ''}
              />
            </div>
            <div className="col-start-13 col-span-4">
              <Sidebar headers={headers} title={data.post.title || ''} />
            </div>
          </div>
          <PostComment postId={data.post.id}/>
        </div>
      ) : (
        <div className="text-center text-red-500">Post not found</div>
      )}
    </>
  );
}
