import { useNavigate } from "react-router-dom";
import { PostList } from "@/components/post/PostList";
import Sidebar from "@/components/Sidebar";
import { getPostNewest } from "@/services/PostService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import PaginationComponent from "@/components/PaginationComponent";
import { Helmet } from "react-helmet";
import { useAtom } from "jotai";
import { titleNewAtom } from "@/atoms/authAtoms";

export default function NewestPage() {
  const queryParameters = new URLSearchParams(window.location.search)
  const pageParam = queryParameters.get("page")
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(Number(pageParam) || 1);
  const [titleNew, setTitleNew] = useAtom(titleNewAtom)

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['GetNewestPost', page],
    queryFn: () => getPostNewest(page),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setTitleNew("Bài viêt mới nhất")
  }, [setTitleNew])

  useEffect(() => {
    if (pageParam) {
      setPage(Number(pageParam));
    }
  }, [pageParam]);

  const currentPage = data?.meta.current_page || 1;
  const lastPage = data?.meta.last_page || 1;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(`/newest?page=${newPage}`);
  };

  return (
    <>
      <Helmet>
        <title>{titleNew}</title>
      </Helmet>
      <div className="max-w-7xl items-center justify-center m-auto min-h-screen">
        <div className="grid grid-cols-16 pt-4 pb-4 gap-4">
          <div className="col-start-1 col-end-13">
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {error.message}</div>}
            {data && (
              <>
                <PostList posts={data.data ?? []} />
                <div className="mb-3" />
                <PaginationComponent
                  currentPage={currentPage}
                  lastPage={lastPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
          <div className="col-start-13 col-span-4">
            <Sidebar title={''} />
          </div>
        </div>
      </div>
    </>

  );
}
