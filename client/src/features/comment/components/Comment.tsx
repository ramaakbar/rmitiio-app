import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { CommentType } from "../commentTypes";

type CommentProp = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProp) {
  return (
    <div className="flex flex-row space-x-3 rounded-md bg-grey-50 px-4 py-3 hover:bg-grey-100">
      <img
        src="./placeholder_profile.jpeg"
        alt=""
        className="h-10 w-10 rounded-full"
      />
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row items-center space-x-1">
          <Link
            to={`/${comment.user.username}`}
            className="text-base font-bold text-grey-900 hover:underline"
          >
            @{comment.user.username}
          </Link>
          <span>·</span>
          <span className="text-sm text-grey-600">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>
        <div className="text-grey-900">{comment.content}</div>
        <img
          src={comment.picture}
          alt={comment.picture}
          className="rounded-md"
        />
        <div>Like</div>
      </div>
    </div>
  );
}
