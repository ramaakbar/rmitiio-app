import { FormInput } from "../../../components/FormInput";
import { LoginInput, loginSchema } from "../schemas/loginSchema";
import { useLogin } from "../hooks/useLogin";
import { useCustomForm } from "../../../hooks/useCustomForm";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useCustomForm<LoginInput>(loginSchema);

  const mutation = useLogin();

  const onSubmitHandle = (data: LoginInput) => {
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
        label="Password"
        type="password"
        error={errors?.password?.message}
        {...register("password")}
      />
      <button
        disabled={mutation.isLoading}
        className="rounded-md bg-grey-900 px-4 py-2 text-white hover:bg-grey-800 disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );
}
