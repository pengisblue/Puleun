// import { useParams } from "react-router-dom";
import KidChatBubble from "../components/Talk/KidChatBubble copy";
import GptChatBubble from "../components/Talk/GptChatBubble";
import Star from "../components/UI/star";
import PotProfileImage from "../components/Pots/PotProfileImage";
import chevron from "../asset/chevron-left.svg";
import play from "../asset/play.svg";
import pause from "../asset/pause.svg";
import rewind from "../asset/forward-solid_back.svg";
import foward from "../asset/forward-solid_front.svg";
import dayjs from "dayjs";
import { useState } from "react";

// 임시
import { TALK_DETAIL } from "../test/talkList";

export default function TalkDetailPage() {
  // const params = useParams();

  const {
    created_DT,
    isFavorite,
    sentence,
    potImg,
    // talkID,
    talkTitle,
    userImg,
  } = TALK_DETAIL;
  const createdAt = dayjs(created_DT).format("YYYY/MM/DD");

  // 즐겨찾기
  const [starState, setStarState] = useState(isFavorite);
  const handleStar = () => {
    const newStarState = !starState;
    setStarState(newStarState);
  };

  // 전체 재생
  const [playState, setPlayState] = useState(false);
  const handlePlayState = () => {
    const newPlayState = !playState;
    setPlayState(newPlayState);
  };

  return (
    <div>
      {/* 타이틀 */}
      <div className="fixed left-0 top-16 flex w-full items-center justify-between gap-2 bg-amber-100 p-4">
        <img src={chevron} alt="back" className="w-12" />
        <div className="flex flex-wrap gap-2">
          <h1 className="mx-auto text-title">{talkTitle}</h1>
          <div className="ms-auto flex items-center gap-2">
            <div className="w-8 overflow-hidden rounded-full">
              <PotProfileImage imgUrl={potImg} alt="pot" />
            </div>
            <p>{createdAt}</p>
          </div>
        </div>
        <div>
          <Star
            onClick={handleStar}
            fill={starState ? "#FCD34D" : "#FFFFFF"}
            className="mx-1.5 w-12 cursor-pointer "
          />
        </div>
      </div>

      {/* 대화 */}
      <div className="pt-28">
        {sentence.map((chat) =>
          chat.talker === "kid" ? (
            <KidChatBubble key={chat.id} profileImg={userImg}>
              {chat.content}
            </KidChatBubble>
          ) : (
            <GptChatBubble key={chat.id}>{chat.content}</GptChatBubble>
          ),
        )}
      </div>

      {/* 재생바 */}
      <div className="fixed bottom-0 left-0 flex w-full justify-center bg-amber-100 p-6">
        <div className="flex max-w-96 w-full gap-4 justify-between">
          <img src={rewind} className="w-10" alt="rewind button" />
          <img
            onClick={handlePlayState}
            src={playState ? pause : play}
            className="w-8"
            alt="play button"
          />
          <img src={foward} className="w-10" alt="foward button" />
        </div>
      </div>
    </div>
  );
}
