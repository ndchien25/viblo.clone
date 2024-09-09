import Sidebar from "@/components/Sidebar";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark, ChevronDown, ChevronUp, Ellipsis, Facebook, MessagesSquare, Pencil, Star, Twitter, Type, UserPlus, View } from "lucide-react";
import { getPostBySlugService } from "@/services/PostService";
import { useEffect, useState } from "react";
import { Post } from "@/models/Post";
import MarkdownViewer from "@/components/MarkdownViewer";

export function Homepage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchPost() {
      const postData: Post | null = await getPostBySlugService(slug as string, (error: any) => {
        console.log(error?.message)
      });
      if (postData === null) {
        setError('Post not found');
      } else {
        setPost(postData);
      }
      setLoading(false);
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);
  if (loading) return <div>Loading...</div>;

  return (
    <>
      {post ? (
        <div className="grid grid-cols-16 pt-4 pb-4 gap-4" >
          <div className="col-start-1 col-span-1">
            <div className="flex flex-col sticky top-0 h-screen items-center justify-center mx-auto py-24">
              <div className="flex flex-col items-center space-y-1 text-4xl mb-4">
                <Button className={cn('text-gray-400 hover:bg-white bg-white')} aria-label="Upvote">
                  <ChevronUp strokeWidth={3} />
                </Button>
                <div className="text-gray-400 text-2xl">
                  <span>+1</span>
                </div>
                <Button className={cn('text-gray-400 hover:bg-white bg-white')} aria-label="Downvote">
                  <ChevronDown strokeWidth={3} />
                </Button>
              </div>
              <div className="mb-8">
                <Button className={cn('text-gray-500 border-gray-500 p-2 hover:bg-slate-200 bg-white rounded-full hover:text-blue-400 hover:border-blue-400  border-[3px]')} title="Bookmark bài viết này">
                  <Bookmark size={18} strokeWidth={3} />
                </Button>
              </div>
              <div className="mb-8">
                <Button className={cn('text-gray-400 p-3 hover:bg-slate-300 bg-white rounded-full border')}>
                  <Type size={16} strokeWidth={1} />
                </Button>
              </div>
              <Button className={cn('text-gray-400 border-gray-300 h-0 w-0 p-4 hover:bg-white  leading-none bg-white rounded-full border mb-2')} title="Bookmark bài viết này">
                <Link to="/">
                  <Facebook size={15} strokeWidth={1} />
                </Link>
              </Button>
              <Button className={cn('text-gray-400 border-gray-300 h-0 w-0 p-4 hover:bg-white  leading-none bg-white rounded-full border')} title="Bookmark bài viết này">
                <Link to="/">
                  <Twitter size={15} strokeWidth={1} />
                </Link>
              </Button>
            </div>
          </div>
          <div className="col-start-2 col-end-13">
            <header>
              <div className="w-full flex flex-row">
                <div className="flex gap-2 break-words">
                  <div className="flex relative flex-col">
                    <Link to="/" className="relative flex flex-col">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Link>
                  </div>
                  <div className="mr-1 leading-6">
                    <div className="flex gap-2">
                      <div className="flex">
                        <Link to="" className="font-bold text-[#5488c7] mr-1">Nguyễn Duy Chiến</Link>
                        <span className="text-[#9b9b9b]">@username</span>
                      </div>
                      <div className="flex">
                        <Button variant="outline" className={cn("px-[10px] py-[5px] font-normal text-xs h-7")}><span>Theo dõi</span></Button>
                      </div>
                    </div>
                    <div className="flex gap-[10px]">
                      <span className="max-h-5 flex items-center" title="Reputations: ">
                        <Star className="mr-1" size={16} opacity={0.5}></Star>
                        <span>1000</span>
                      </span>
                      <span className="max-h-5 flex items-center" title="Người theo dõi"><UserPlus className="mr-1" size={16} opacity={0.5}></UserPlus>100</span>
                      <span className="max-h-5 flex items-center" title="Bài viết"><Pencil className="mr-1" size={16} opacity={0.5}>7</Pencil>7</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-wrap items-end flex-1 text-[#9b9b9b] text-[16px]">
                  <div className="items-center" title="thg 9 6, 10:01 SA">
                    Đã đăng vào khoảng 5 giờ trước
                    <span title="10 phút đọc" className="font-normal before:content-['-'] before:mx-2">10 phút đọc</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 flex text-gray-500 p-2" title="Lượt xem: 46">
                      <View></View>
                      <span>46</span>
                    </div>
                    <div className="mr-2 text-gray-500" title="Di chuyển đến bình luận">
                      <Button type="button" className="bg-transparent flex hover:bg-gray-200 text-gray-500">
                        <MessagesSquare />
                        <span>0</span>
                      </Button>
                    </div>
                    <div className="text-gray-500" title="Xem danh sách người bookmark">
                      <Button type="button" className="bg-transparent flex hover:bg-gray-200 text-gray-500">
                        <Bookmark />
                        <span>0</span>
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
              <h1 className="break-words font-bold text-5xl leading-tight">{post.title}</h1>
            </header>
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center"></div>
              <div>
                <Button className={cn("bg-white text-slate-400 hover:bg-white")} title="Hiện thị các hành động">
                  <Ellipsis size={30} strokeWidth={1.5} />
                </Button>
              </div>
            </div>
            <div className="flex-auto">
              <MarkdownViewer content={post.content || ''} className="prose-stone prose-pre:bg-[#f1f2f3] prose-pre:border-[1px] prose-pre:text-black prose-lead:leading-none"></MarkdownViewer>
            </div>
            <p title="People cannot distribute, remix, adapt, and build upon this workwithout author's permission (or as permitted by fair use)." className="text-slate-500 mb-4">
              All rights reserved
            </p>
            <div className="flex items-center justify-end mb-2">
              <div className="mr-4">
                <Button className={cn('text-gray-400 border-gray-300 h-0 w-0 p-4 hover:bg-white  leading-none bg-white')} title="Bookmark bài viết này">
                  <Link to="/">
                    <Facebook size={20} strokeWidth={1.5} />
                  </Link>
                </Button>
                <Button className={cn('text-gray-400 border-gray-300 h-0 w-0 p-4 hover:bg-white leading-none bg-white')} title="Bookmark bài viết này">
                  <Link to="/">
                    <Twitter size={20} />
                  </Link>
                </Button>
              </div>
              <div>
                <Button className={cn("bg-white text-slate-400 hover:bg-white")} title="Hiện thị các hành động">
                  <Ellipsis size={30} />
                </Button>
              </div>
            </div>
          </div>
          <div className="col-start-13 col-span-4">
            <Sidebar />
          </div>
        </div >
      ) : (
        <div className="text-center text-red-500">{error}</div>
      )
      }
    </>
  )
}
