import { toast } from "react-toastify";
import { useCustomForm } from "../../../hooks/useCustomForm";
import { PostInput, postSchema } from "../schemas/postSchema";
import { UseMutationResult } from "@tanstack/react-query";
import { PostType } from "../postTypes";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type PostFormProps = {
  token: string | undefined;
  mutation: UseMutationResult<PostType, unknown, FormData, string | number>;
  label: string;
};

export default function PostForm({ token, mutation, label }: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useCustomForm<PostInput>(postSchema);

  const [pic, setPic] = useState<File>();

  const loadImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      setPic(image);
    }
  };

  const removeImage = () => {
    setPic(undefined);
    reset({ picture: null });
  };

  const onSubmitHandle = (data: PostInput) => {
    const formPostData = new FormData();
    formPostData.append("content", data.content);
    if (data?.picture) {
      formPostData.append("picture", data?.picture[0] ?? null);
    }

    if (token === undefined) {
      toast.error("You need to login first");
    } else {
      mutation.mutate(formPostData);
    }
    removeImage();
    reset({ picture: null, content: "" });
  };

  return (
    <form
      className="mb-5 flex w-full flex-col space-x-5 space-y-3 border-b px-4 pb-5"
      onSubmit={handleSubmit(onSubmitHandle)}
    >
      <textarea
        {...register("content")}
        onKeyPress={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        placeholder={label}
        className="rounded-md bg-grey-50 px-4 py-2 text-grey-800 focus:outline-none"
      ></textarea>
      <span className="text-red-500">
        {errors?.content?.message?.toString()}
      </span>

      {pic && (
        <div className="relative">
          <div className="absolute top-0 left-0 m-2 rounded-full bg-grey-700/50 p-1 hover:bg-grey-600">
            <XMarkIcon className="h-6 w-6 text-white" onClick={removeImage} />
          </div>
          <img className="rounded-md" src={URL.createObjectURL(pic)} alt="" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md p-1 hover:bg-grey-100"
          >
            <PhotoIcon className="h-6 w-6" />
          </label>
          <input
            {...register("picture")}
            id="picture"
            type="file"
            accept="image/*"
            onChange={loadImagePreview}
            className="hidden"
          />
          <span className="text-sm text-red-500">
            {errors?.picture?.message?.toString()}
          </span>
        </div>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="disabled rounded-md bg-grey-900 px-4 py-2 font-medium text-white hover:bg-grey-800"
        >
          {mutation.isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
