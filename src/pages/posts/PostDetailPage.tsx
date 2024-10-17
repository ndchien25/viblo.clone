import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import PostDetail from '@/components/post/PostDetail';
import PostAction from '@/components/post/PostAction';
import Sidebar from '@/components/Sidebar';
import { PostComment } from '@/components/post/PostComment';
import { authAtom, titleNewAtom } from '@/atoms/authAtoms';
import extractHeaders from '@/utils/extractHeader';
import Header from '@/models/Header';
import { Post } from '@/models/Post';
import { getPostBySlugService, votePostService } from '@/services/PostService';
import {Helmet} from "react-helmet-async";
interface PostData {
  post: Post | null;
  user_vote: 'up' | 'down' | null;
  comment_count: number;
}


export default function PostDetailPage() {
  const [auth] = useAtom(authAtom);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [headers, setHeaders] = useState<Header[]>([]);
  const [titleNew, setTitleNew] = useAtom(titleNewAtom)

  const { data, isLoading, error } = useQuery<PostData | null, Error>({
    queryKey: ['PostBySlug'],
    queryFn: () => getPostBySlugService(slug as string),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (data?.post) {
      setTitleNew(data.post.title || '')
      extractHeaders(data.post.content || '').then(setHeaders);
    }
  }, [data, setTitleNew])

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

    const newVote = vote === data?.user_vote ? null : vote;

    const previousVote = data?.user_vote;  // Store previous vote to roll back if necessary
    const previousVoteCount = data?.post?.vote || 0;

    if (data && data.post) {
      data.user_vote = newVote;

      if (newVote === 'up') {
        data.post.vote = previousVote === 'down' ? previousVoteCount + 2 : previousVoteCount + 1;
      } else if (newVote === 'down') {
        data.post.vote = previousVote === 'up' ? previousVoteCount - 2 : previousVoteCount - 1;
      } else {
        // Undo vote
        data.post.vote = previousVote === 'up' ? previousVoteCount - 1 : previousVoteCount + 1;
      }
    }
    mutation.mutate(newVote);
  };

  return (
    <>
      <Helmet>
        <title>{titleNew}</title>
      </Helmet>
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
                comment_count={data.comment_count}
              />
            </div>
            <div className="col-start-13 col-span-4">
              <Sidebar headers={headers} title={data.post.title || ''} />
            </div>
          </div>
          <PostComment postId={data.post.id} />
        </div>
      ) : (
        <div className="text-center text-red-500">Post not found</div>
      )}
    </>
  );
}
