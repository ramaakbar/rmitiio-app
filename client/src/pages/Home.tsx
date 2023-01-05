import AuthModal from "../features/auth/components/AuthModal";
import useAuth from "../features/auth/hooks/useAuth";
import PostForm from "../features/post/components/PostForm";
import PostList from "../features/post/components/PostList";
import { useCreatePost } from "../features/post/hooks/useCreatePost";
import { usePosts } from "../features/post/hooks/usePosts";
import { PostType } from "../features/post/postTypes";

export default function Home() {
  const {
    data: posts,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = usePosts();

  const { token } = useAuth();

  const mutation = useCreatePost(token);

  return (
    <>
      <PostForm
        label="What's on your mind today?"
        token={token}
        // @ts-ignore
        mutation={mutation}
      />
      <PostList
        posts={posts}
        status={status}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      <AuthModal />
    </>
  );
}
