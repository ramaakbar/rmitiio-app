import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import PostList from "../features/post/components/PostList";
import { usePostsUsername } from "../features/profile/hooks/usePostsUsername";
import { useUser } from "../features/profile/hooks/useUser";
import UserProfile from "../features/profile/components/UserProfile";

export default function Profile() {
  const { username } = useParams();

  const { data: user, status: userStatus } = useUser(username);

  const {
    data: posts,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = usePostsUsername(username, user?.data);

  return (
    <>
      {userStatus === "loading" ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : user ? (
        <UserProfile user={user.data} />
      ) : (
        <div className="px-4">user not found</div>
      )}

      {posts && (
        <PostList
          posts={posts}
          status={status}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </>
  );
}
