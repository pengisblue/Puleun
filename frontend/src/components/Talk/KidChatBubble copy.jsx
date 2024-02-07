import UserProfileImage from "../Users/UserProfileImage";

export default function KidChatBubble({ children, profileImg }) {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-10 overflow-hidden rounded-full">
        <UserProfileImage imgUrl={profileImg} />
      </div>
      <p>{children}</p>
    </div>
  );
}
