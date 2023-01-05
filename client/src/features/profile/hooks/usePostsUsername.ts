import { useInfiniteQuery } from "@tanstack/react-query";
import { UserType } from "../../auth/authTypes";
import { fetchInfinitePostsByUsername } from "../profileApi";

export const usePostsUsername = (
  username: string | undefined,
  user: UserType | undefined
) =>
  useInfiniteQuery({
    queryKey: ["posts", username],
    queryFn: ({ pageParam }) =>
      fetchInfinitePostsByUsername({ username, pageParam }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    enabled: !!user,
  });
