import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinitePosts } from "../postApi";

export const usePosts = () =>
  useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchInfinitePosts,
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
  });
