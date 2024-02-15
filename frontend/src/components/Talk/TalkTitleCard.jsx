import UserProfileImage from "../Users/UserProfileImage";
import PotProfileImage from "../Pots/PotProfileImage";
import Star from "../UI/star";
import wateringCan from "../../asset/watering_can.svg";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { API_URL } from "../../config/config";

export default function TalkTitleCard({
  talk_id,
  created_DT,
  talk_title,
  pot,
  read_FG,
  star_FG,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [starState, setStarState] = useState(star_FG === 1 ? true : false);
  const handleStar = () => {
    const newStarState = !starState;

    axios({
      method: "put",
      url: `${API_URL}/talk/bookmark/${talk_id}`,
    })
      .then((res) => {
        console.log(res);
        setStarState(newStarState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isReadState, setIsReadState] = useState(read_FG === 1 ? true : false);
  const handleRead = () => {
    if (!isReadState) {
      setIsReadState(true);
    }
  };

  const goTalkDetail = function (talk_id) {
    return () => {
      handleRead();
      navigate(`/talk/${talk_id}`, { state: { from: location } });
    };
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
        onClick={goTalkDetail(talk_id)}
        className={`h-full w-full cursor-pointer p-3 ${isReadState ? "bg-amber-50" : "bg-amber-200"}`}
      >
        <div className="flex flex-wrap justify-between">
          <div className="flex items-center gap-1">
            <div className="w-7 overflow-hidden rounded-full border border-amber-500 outline outline-1 outline-amber-500">
              <UserProfileImage imgUrl={pot.user.profile_img_url} />
            </div>

            <img src={wateringCan} alt="wateringCan" className="w-6" />

            <div className="w-7 overflow-hidden rounded-full border border-green-500 outline outline-1 outline-green-500">
              <PotProfileImage imgUrl={pot.pot_img_url} />
            </div>
          </div>
          <p className="text-xs">{createdAt}</p>
        </div>
        <p className="mt-2 w-11/12 truncate text-xl font-bold">{talk_title}</p>
      </div>
    </div>
  );
}
