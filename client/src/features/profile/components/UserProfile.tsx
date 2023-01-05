import { UserType } from "../../auth/authTypes";

type UserProfilePage = {
  user: UserType;
};

export default function UserProfile({ user }: UserProfilePage) {
  return (
    <div className="mb-5 border-b pb-5">
      <div className="flex flex-col items-center space-y-2">
        <img
          src="./placeholder_profile.jpeg"
          alt=""
          className="h-16 w-16 rounded-full"
        />
        <h3 className="text-lg font-bold text-grey-900">@{user.username}</h3>
        <div className="flex space-x-5">
          <div className="flex flex-col items-center">
            <span className="text-grey-600">Posts</span>
            <span className="font-bold text-grey-900">10</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-grey-600">Comments</span>
            <span className="font-bold text-grey-900">10</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-grey-600">Likes</span>
            <span className="font-bold text-grey-900">10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
