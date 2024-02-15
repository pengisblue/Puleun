import UserProfileImage from "../Users/UserProfileImage";
import play from "../../asset/play_circle.svg";
import pause from "../../asset/pause_circle.svg";
import { useState } from "react";

export default function KidChatBubble({
  children,
  userImg,
  userName,
  audioUrl,
}) {
  const audioContainer = document.querySelector("#audioContainer");
  const [playState, setPlayState] = useState(false);
  const handlePlayState = () => {
    const newPlayState = !playState;
    setPlayState(newPlayState);
    console.log(audioUrl);
    audioContainer.play();
  };

  return (
    <div className="flex items-start gap-2">
      <div className="w-10 overflow-hidden rounded-full border-2 border-amber-400">
        <UserProfileImage imgUrl={userImg} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {/* <span className="font-semibold">{userName}</span> */}

          <audio id="audioContainer">
            <source id="audioSource" src={audioUrl}></source>
          </audio>

          {/* 음성 재생 */}
          <img
            onClick={handlePlayState}
            src={playState ? pause : play}
            className="w-6 cursor-pointer"
            alt="play button"
          />
        </div>

        {/* 텍스트 */}
        <div className="max-w-56 text-wrap rounded-b-2xl rounded-tr-2xl bg-amber-200 p-4">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}
