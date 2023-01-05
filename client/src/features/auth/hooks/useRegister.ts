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
    onMutate: () => {
      const notif = toast.loading("Registering User...");
      return notif;
    },
    onSuccess: (data, _, toastId) => {
      toast.update(toastId as number, {
        render: "Successfuly Register",
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
