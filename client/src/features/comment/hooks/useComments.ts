import { useInfiniteQuery } from "@tanstack/react-query";
import { PostResponse } from "../../post/postTypes";
import { fetchInfiniteCommentsByPostId } from "../commentApi";

export const useComments = (
  postId: string | undefined,
  post: PostResponse | undefined
) =>
  useInfiniteQuery({
    queryKey: ["comments", postId],
    queryFn: ({ pageParam }) =>
      fetchInfiniteCommentsByPostId({ postId, pageParam }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    enabled: !!post,
  });
