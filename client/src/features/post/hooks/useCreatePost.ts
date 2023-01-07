import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import { createPost } from "../postApi";
import { PostInput } from "../schemas/postSchema";

export const useCreatePost = (token: string | undefined) => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: (postInput: FormData) => createPost(postInput, token),
    onSuccess: (data, _) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created");
    },
    onError: (error: any, _) => {
      let msg = "server error";

      if (error.response.data.message === "Access Token Expired") {
        msg = `${error.response.data.message}, please refresh the page`;
      } else if (error.response.data.message === "Refresh Token Expired") {
        logout();
        msg = `${error.response.data.message} refresh token and access token expired, please login again`;
      } else {
        msg = error.response.data.message;
      }
      toast.error(`There was an error, ${msg}`);
    },
  });
};
