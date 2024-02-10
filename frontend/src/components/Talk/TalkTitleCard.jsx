import UserProfileImage from "../Users/UserProfileImage";
import PotProfileImage from "../Pots/PotProfileImage";
import Star from "../UI/star";
import wateringCan from "../../asset/watering_can.svg";
import { useState } from "react";
import dayjs from "dayjs";

export default function TalkTitleCard({
  created_DT,
  talkTitle,
  userImg,
  potImg,
  isRead,
  isFavorite,
}) {
  const [starState, setStarState] = useState(isFavorite);
  const handleStar = () => {
    const newStarState = !starState;
    setStarState(newStarState);
  };

  const [isReadState, setIsReadState] = useState(isRead);
  const handleRead = () => {
    if (!isReadState) {
      setIsReadState(true);
    }
  };

  const createdAt = dayjs(created_DT).format("YY/MM/DD");

  return (
    <div
      className="m-4 flex w-80 items-center overflow-hidden rounded-lg shadow-lg 
        ring ring-amber-200 ring-offset-1 ring-offset-amber-300"
    >
      {/* 즐겨찾기 표시 */}
      <div className="flex h-full items-center bg-orange-100">
        <Star
          onClick={handleStar}
          fill={starState ? "#FCD34D" : "#FFFFFF"}
          className="mx-1.5 w-10 cursor-pointer "
        />
      </div>

      {/* 대화 내용 */}
      <div
        onClick={handleRead}
        className={`h-full w-full cursor-pointer p-3 ${isReadState ? "bg-amber-50" : "bg-amber-200"}`}
      >
        <div className="flex justify-between flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-7 overflow-hidden rounded-full border border-amber-500 outline outline-1 outline-amber-500">
              <UserProfileImage imgUrl={userImg} />
            </div>
            <img src={wateringCan} alt="wateringCan" className="w-6" />
            <div className="w-7 overflow-hidden rounded-full border border-green-500 outline outline-1 outline-green-500">
              <PotProfileImage imgUrl={potImg} />
            </div>
          </div>
          <p className="text-xs">{createdAt}</p>
        </div>
        <p className="mt-2 text-xl font-bold truncate w-11/12">{talkTitle}</p>
      </div>
    </div>
  );
}
