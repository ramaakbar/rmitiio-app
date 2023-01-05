import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useAuth from "../features/auth/hooks/useAuth";
import CommentList from "../features/comment/components/CommentList";
import { useComments } from "../features/comment/hooks/useComments";
import { useCreateComment } from "../features/comment/hooks/useCreateComment";
import Detail from "../features/post/components/Detail";
import PostForm from "../features/post/components/PostForm";
import { usePost } from "../features/post/hooks/usePost";

export default function PostDetail() {
  const { postId } = useParams();
  const { data: post, status: postStatus } = usePost(postId);
  const {
    data: comments,
    status: commentStatus,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useComments(postId, post);

  const { token } = useAuth();

  const mutation = useCreateComment(postId, token);

  return (
    <>
      {postStatus === "loading" ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : post ? (
        <>
          <Detail post={post.data} />
          {/* @ts-ignore */}
          <PostForm label="Comment" token={token} mutation={mutation} />
        </>
      ) : (
        <div className="px-4">Post not found</div>
      )}

      {comments && (
        <CommentList
          comments={comments}
          status={commentStatus}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </>
  );
}
