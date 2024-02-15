import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import TalkTitleCard from "../components/Talk/TalkTitleCard";
import cog from "../asset/cog-8-tooth.svg";

export default function TalkListPage() {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [isStar, setIsStar] = useState(false);
  const handleClickAll = () => {
    setIsStar(false);
  };
  const handleClickFavorite = () => {
    setIsStar(true);
  };
  const [talkList, setTalkList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://i10e101.p.ssafy.io/v1/talk/all/${userInfo.userId}`,
      )
      .then((res) => {
        setTalkList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo.userId]);

  return (
    <div className="">
      <div className="fixed top-16 w-full max-w-page bg-amber-overlay pt-2">
        <div className="left-0 m-2 flex items-center justify-between px-6">
          <h1 className="text-title">우리 대화</h1>
          <img src={cog} alt="cog" className="w-7 cursor-pointer" />
        </div>

        {/* 전체 | 즐겨찾기 필터 */}
        <div className="flex border-amber-300 text-center text-xl font-semibold">
          <p
            onClick={handleClickAll}
            className={`basis-1/2 cursor-pointer py-3 ${isStar ? "text-amber-cloudy" : "text-slate-950"}`}
          >
            전체
          </p>
          <div className="my-3 box-border w-0.5 bg-amber-300"></div>
          <p
            onClick={handleClickFavorite}
            className={`basis-1/2 cursor-pointer py-3 ${isStar ? "text-slate-950" : "text-amber-cloudy"}`}
          >
            즐겨찾기
          </p>
        </div>
      </div>

      {/* 대화 목록 */}
      <div className="mx-2 flex flex-wrap gap-1 px-6 pt-28">
        {talkList
          .filter((talk) => !isStar || talk.isFavorite)
          .map((talk) => (
            <TalkTitleCard key={talk.talk_id} {...talk} />
          ))}
      </div>
    </div>
  );
}
