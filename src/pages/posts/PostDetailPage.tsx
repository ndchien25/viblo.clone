import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostBySlugService } from "@/services/PostService";
import { useEffect, useState } from "react";
import { Post } from "@/models/Post";
import PostDetail from "@/components/post/PostDetail";
import PostAction from "@/components/post/PostAction";
import Sidebar from "@/components/Sidebar";
import { useAtom } from "jotai";
import { authAtom } from "@/atoms/authAtoms";
import { votePostService } from "@/services/VoteService";
import extractHeaders from "@/utils/extractHeader";
import Header from "@/models/Header";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface PostData {
  post: Post | null;
  error: boolean;
  user_vote: 'up' | 'down' | null;
}

export default function PostDetailPage() {
  const [auth] = useAtom(authAtom)
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [headers, setHeaders] = useState<Header[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHeaders = async () => {
      const headers = await extractHeaders(post?.content || '');
      setHeaders(headers);
    };
    fetchHeaders();
  }, [post?.content]);

  useEffect(() => {
    async function fetchPost() {
      const postData: PostData = await getPostBySlugService(slug as string, (error: any) => {
        console.log(error?.message);
      });
      if (postData === null) {
        setError('Post not found');
      } else {
        setPost(postData.post);
        setUserVote(postData.user_vote);
      }
      setLoading(false);  // Set loading to false after fetching
    }
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const updateVote = async (vote: 'up' | 'down' | null) => {
    if (!auth) {
      return navigate('/login')
    }
    if (userVote === vote) {
      setUserVote(null);
    } else {
      setUserVote(vote);
    }
    const newVote = userVote === vote ? null : vote;
    setUserVote(newVote);

    await votePostService(post?.id as unknown as string || '', newVote || 'none', (error: any) => {
      console.error(error);
    });
    setPost((prevPost) => {
      let newVoteValue = post?.vote || 0;

      if (userVote === null) {
        newVoteValue = vote === 'up' ? newVoteValue + 1 : newVoteValue - 1
      }
      if (userVote === vote) {
        newVoteValue = vote === 'up' ? newVoteValue - 1 : newVoteValue + 1
      }
      if (userVote === 'up' && vote === 'down') {
        newVoteValue -= 2;
      } else if (userVote === 'down' && vote === 'up') {
        newVoteValue += 2;
      }
      return {
        ...prevPost,
        vote: newVoteValue,
      } as Post;;
    });

  };

  return (
    <>
      {post ? (
        <div className="max-w-7xl items-center justify-center m-auto px-7">
          <div className="grid grid-cols-16 pt-4 pb-4 gap-4">
            <div className="col-start-1 col-span-1">
              {!loading &&
                <PostAction user_vote={userVote} vote={post.vote || 0} onVote={(vote) => updateVote(vote)} />
              }
            </div>
            <div className="col-start-2 col-end-13">
              <PostDetail
                post={post}
                loading={loading}
                error={error}
              />
            </div>
            <div className="col-start-13 col-span-4">
              <Sidebar headers={headers} title={post.title || ''} />
            </div>
          </div>
          <div>
            <p className="mb-2 font-bold text-xl">Bình luận</p>
            
            <Link to="/login">
              <Card className="items-center flex mb-1 flex-col">
                <CardContent className="flex-auto p-5">
                  <span className="flex gap-2 text-slate-400 items-center">
                    <MessageCircle size={16} />
                    Đăng nhập để bình luận
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div >
      ) : (
        <div className="text-center text-red-500">{error || "Loading..."}</div>
      )
      }
    </>
  );
}
