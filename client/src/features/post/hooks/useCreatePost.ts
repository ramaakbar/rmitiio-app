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
    onMutate: () => {
      const notif = toast.loading("Posting...");
      return notif;
    },
    onSuccess: (data, _, toastId) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.update(toastId as number, {
        render: "Post Created",
        type: "success",
        isLoading: false,
        autoClose: 4000,
        closeButton: true,
      });
    },
    onError: (error: any, _, toastId) => {
      let msg = "error";

      if (error.response.data.message === "Access Token Expired") {
        msg = `${error.response.data.message}, please refresh the page`;
      } else if (error.response.data.message === "Refresh Token Expired") {
        logout();
        msg = `${error.response.data.message} refresh token and access token expired, please login again`;
      } else {
        msg = "server error";
      }
      toast.update(toastId as number, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    },
  });
};
