import { useMutation } from "@tanstack/react-query";
import { logoutUserFn } from "../authApi";
import { toast } from "react-toastify";
import { UserType } from "../authTypes";
import useAuth from "./useAuth";

export const useLogout = () => {
  const { data: session, logout } = useAuth();

  return useMutation({
    mutationFn: logoutUserFn,
    onSuccess: () => {
      if (session) {
        logout!();
        toast.success("Successfuly Logout");
      } else {
        toast.error("There was an error");
      }
    },
    onError: (error: any) => {
      toast.error(`There was an error, ${error.response.data.message}`);
    },
  });
};
