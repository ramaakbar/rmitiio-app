import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../postApi";

export const usePost = (postId: string | undefined) =>
  useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
  });
