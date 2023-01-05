import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { PostInput } from "../../post/schemas/postSchema";
import { createComment } from "../commentApi";

export const useCreateComment = (
  postId: string | undefined,
  token: string | undefined
) => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: (postInput: FormData) =>
      createComment(postId, postInput, token),
    onSuccess: (data, _) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("Comment created");
    },
    onError: (error: any, _) => {
      let msg;
      if (error.response.data.message === "Access Token Expired") {
        msg = `${error.response.data.message}, please refresh the page`;
      } else {
        logout();
        msg = `${error.response.data.message} refresh token and access token expired, please login again`;
      }
      toast.error(`There was an error, ${msg}`);
    },
  });
};
