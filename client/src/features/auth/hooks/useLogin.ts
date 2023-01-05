import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginUserFn } from "../authApi";
import { LoginInput } from "../schemas/loginSchema";
import useAuthModalStore from "../stores/useAuthModalStore";
import { useAuthStore } from "../stores/useAuthStore";

export const useLogin = () => {
  const closeModal = useAuthModalStore((state) => state.closeModal);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (loginInput: LoginInput) => loginUserFn(loginInput),
    onMutate: () => {
      const notif = toast.loading("Logging in...");
      return notif;
    },
    onSuccess: (data, _, toastId) => {
      setToken(data.accessToken);
      toast.update(toastId as number, {
        render: "Successfuly Login",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
      closeModal();
    },
    onError: (error: any, _, toastId) => {
      toast.update(toastId as number, {
        render: `There was an error, ${error.response.data.message}`,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    },
  });
};
