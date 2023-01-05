import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../../../components/Spinner";
import { CommentsResponse } from "../commentTypes";
import Comment from "./Comment";

type CommentListProps = {
  comments: InfiniteData<CommentsResponse> | undefined;
  status: "loading" | "error" | "success";
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<CommentsResponse, unknown>>;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
};

export default function CommentList({
  comments,
  status,
  fetchNextPage,
  isFetching,
  hasNextPage,
  isFetchingNextPage,
}: CommentListProps) {
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
    <div className="mb-5 mt-5 space-y-5 px-4">
      {comments?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page.data.map((comment) => (
            <Comment comment={comment} key={comment.id} />
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
