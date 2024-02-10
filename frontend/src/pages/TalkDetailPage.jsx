// import { useParams } from "react-router-dom";
import KidChatBubble from "../components/Talk/KidChatBubble";
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
import { useLocation, useNavigate } from "react-router-dom";

// 임시
import { TALK_DETAIL } from "../test/talkList";

export default function TalkDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // const params = useParams();

  // 하드코딩용
  const {
    created_DT,
    isFavorite,
    sentence,
    potImg,
    // talkID,
    talkTitle,
    userImg,
    userName,
  } = TALK_DETAIL;
  const createdAt = dayjs(created_DT).format("YYYY/MM/DD");

  // 뒤로가기
  const handleBack = () => {
    if (location.state?.from) {
      navigate(-1);
    } else {
      navigate("/talk");
    }
  };

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
      <div className="fixed left-0 top-16 flex w-full items-center justify-between gap-2 bg-amber-100 px-4 py-3">
        {/* 뒤로가기 */}
        <img onClick={handleBack} src={chevron} alt="back" className="w-8 cursor-pointer" />
        {/* 제목, 화분, 날짜 */}
        <div className="flex flex-col gap-2">
          <h1 className="max-w-64 truncate text-xl">{talkTitle}</h1>
          <div className="ms-auto flex items-center gap-2">
            <div className="w-6 overflow-hidden rounded-full">
              <PotProfileImage imgUrl={potImg} alt="pot" />
            </div>
            <p>{createdAt}</p>
          </div>
        </div>
        {/* 즐겨찾기 */}
        <div className="p-1">
          <Star
            onClick={handleStar}
            fill={starState ? "#FCD34D" : "#FFFFFF"}
            className="w-10 cursor-pointer"
          />
        </div>
      </div>

      {/* 대화 */}
      <div className="flex flex-col pt-28">
        {sentence.map((chat) =>
          chat.talker === "kid" ? (
            <div className="me-auto" key={chat.id}>
              <KidChatBubble userImg={userImg} userName={userName}>
                {chat.content}
              </KidChatBubble>
            </div>
          ) : (
            <div className="ms-auto" key={chat.id}>
              <GptChatBubble>{chat.content}</GptChatBubble>
            </div>
          ),
        )}
      </div>

      {/* 재생바 */}
      <div className="fixed bottom-0 left-0 flex w-full justify-center bg-amber-100 p-4">
        <div className="flex w-full max-w-80 justify-between gap-4">
          <img src={rewind} className="w-10 cursor-pointer" alt="rewind button" />
          <img
            onClick={handlePlayState}
            src={playState ? pause : play}
            className="w-8 cursor-pointer"
            alt="play button"
          />
          <img src={foward} className="w-10 cursor-pointer" alt="foward button" />
        </div>
      </div>
    </div>
  );
}
