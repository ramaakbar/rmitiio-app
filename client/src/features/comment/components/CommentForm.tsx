import { useCustomForm } from "../../../hooks/useCustomForm";
import useAuth from "../../auth/hooks/useAuth";
import { PostInput, postSchema } from "../../post/schemas/postSchema";

export default function CommentForm() {
  const { token } = useAuth();

  const { register, handleSubmit, reset } =
    useCustomForm<PostInput>(postSchema);

  const mutation = useCreatePost(token);

  const onSubmitHandle = (data: PostInput) => {
    if (token === undefined) {
      toast.error("You need to login first");
    } else {
      mutation.mutate(data);
    }
    reset();
  };

  return <div>CommentForm</div>;
}
