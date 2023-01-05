import dayjs from "dayjs";
import { PostType } from "../postTypes";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

type PostProps = {
  post: PostType;
};

dayjs.extend(relativeTime);

export default function Post({ post }: PostProps) {
  return (
    <Link
      to={"/posts/" + post.id}
      className="flex flex-row space-x-3 rounded-md bg-grey-50 px-4 py-3 hover:bg-grey-100"
    >
      <img
        src={post.user.picture ?? ""}
        alt=""
        className="h-10 w-10 rounded-full"
      />
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row items-center space-x-1">
          <Link
            to={`/${post.user.username}`}
            className="text-base font-bold text-grey-900 hover:underline"
          >
            @{post.user.username}
          </Link>
          <span>·</span>
          <span className="text-sm text-grey-600">
            {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
        <div className="text-grey-900">{post.content}</div>
        <img src={post.picture} alt={post.picture} className="rounded-md" />
        <div>Like</div>
      </div>
    </Link>
  );
}
