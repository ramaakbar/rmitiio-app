import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { registerUserFn } from "../authApi";
import { RegisterInputWithoutPassConf } from "../schemas/registerSchema";
import useAuthModalStore from "../stores/useAuthModalStore";

export const useRegister = () => {
  const closeModal = useAuthModalStore((state) => state.closeModal);

  return useMutation({
    mutationFn: (registerInput: RegisterInputWithoutPassConf) =>
      registerUserFn(registerInput),
    onSuccess: (data, _) => {
      toast.success("Successfully Register");
      closeModal();
    },
    onError: (error: any, _) => {
      const msg = error?.response?.data?.message ?? "";
      toast.error(`There was an error, ${msg}`);
    },
  });
};
