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
    onSuccess: (data, _) => {
      setToken(data.accessToken);
      toast.success("Successfully Login");
      closeModal();
    },
    onError: (error: any, _) => {
      const msg = error?.response?.data?.message ?? "";
      toast.error(`There was an error, ${msg}`);
    },
  });
};
