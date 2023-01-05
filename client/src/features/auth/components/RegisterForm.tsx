import {
  RegisterInput,
  RegisterInputWithoutPassConf,
  registerSchema,
} from "../schemas/registerSchema";
import { FormInput } from "../../../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { useCustomForm } from "../../../hooks/useCustomForm";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useCustomForm<RegisterInput>(registerSchema);

  const mutation = useRegister();

  const onSubmitHandle = (data: RegisterInputWithoutPassConf) => {
    mutation.mutate(data);
    reset();
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmitHandle)}>
      <FormInput
        label="Email"
        type="email"
        error={errors?.email?.message}
        {...register("email")}
      />
      <FormInput
        label="Username"
        type="text"
        error={errors?.username?.message}
        {...register("username")}
      />
      <FormInput
        label="Password"
        type="password"
        error={errors?.password?.message}
        {...register("password")}
      />
      <FormInput
        label="Password Confirmation"
        type="password"
        error={errors?.passwordConfirmation?.message}
        {...register("passwordConfirmation")}
      />
      <button
        disabled={mutation.isLoading}
        className="rounded-md bg-grey-900 px-4 py-2 text-white hover:bg-grey-800 disabled:cursor-not-allowed"
      >
        {mutation.isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
