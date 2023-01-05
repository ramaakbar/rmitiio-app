import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../components/Spinner";
import Post from "./Post";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { PostsResponse } from "../postTypes";

type PostListProps = {
  posts: InfiniteData<PostsResponse> | undefined;
  status: "loading" | "error" | "success";
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PostsResponse, unknown>>;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
};

export default function PostList({
  posts,
  status,
  fetchNextPage,
  isFetching,
  hasNextPage,
  isFetchingNextPage,
}: PostListProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView === true) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "loading") {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }
  if (status === "error") {
    return <span>There is an error on fetching posts</span>;
  }

  return (
    <div className="mb-5 space-y-5 px-4">
      {posts?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page.data.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </Fragment>
      ))}
      <div className="flex justify-center">
        {isFetching ? (
          <Spinner />
        ) : (
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {/* {hasNextPage ? "Load More" : "Nothing more to load"} */}
          </button>
        )}
      </div>
    </div>
  );
}
