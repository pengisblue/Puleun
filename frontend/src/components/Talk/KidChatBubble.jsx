import UserProfileImage from "../Users/UserProfileImage";
import play from "../../asset/play_circle.svg"
import pause from "../../asset/pause_circle.svg"
import { useState } from "react";

export default function KidChatBubble({ children, userImg, userName }) {
  const [playState, setPlayState] = useState(false);
  const handlePlayState = () => {
    const newPlayState = !playState;
    setPlayState(newPlayState);
  };

  return (
    <div className="flex items-start gap-2">
      <div className="w-10 overflow-hidden rounded-full border-2 border-amber-400">
        <UserProfileImage imgUrl={userImg} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{userName}</span>
          <img
            onClick={handlePlayState}
            src={playState ? pause : play}
            className="w-6 cursor-pointer"
            alt="play button"
          />
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
}
