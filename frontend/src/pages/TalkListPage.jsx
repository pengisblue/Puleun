import TalkTitleCard from "../components/Talk/TalkTitleCard";
import cog from "../asset/cog-8-tooth.svg";
import { useState } from "react";

// 테스트 데이터
import { TALK_LIST } from "../test/talkList";

export default function TalkListPage() {
  const [isStar, setIsStar] = useState(false);
  const handleClickAll = () => {
    setIsStar(false);
  };
  const handleClickFavorite = () => {
    setIsStar(true);
  };

  return (
    <div className="">
      <div className="fixed top-16 w-full bg-amber-overlay pe-12 pt-2">
        <div className="left-0 m-2 flex items-center justify-between">
          <h1 className="text-title">우리 대화</h1>
          <img src={cog} alt="cog" className="w-7 cursor-pointer" />
        </div>

        {/* 전체 | 즐겨찾기 필터 */}
        <div className="flex border-amber-300 text-center text-xl font-semibold">
          <p
            onClick={handleClickAll}
            className={`basis-1/2 cursor-pointer border-r-4 border-amber-300 py-3 pr-2 ${isStar ? "text-amber-cloudy" : "text-slate-950"}`}
          >
            전체
          </p>
          <p
            onClick={handleClickFavorite}
            className={`basis-1/2 cursor-pointer py-3 pl-2 ${isStar ? "text-slate-950" : "text-amber-cloudy"}`}
          >
            즐겨찾기
          </p>
        </div>
      </div>

      {/* 대화 목록 */}
      <div className="mx-2 flex flex-wrap gap-1 pt-28">
        {TALK_LIST.filter((talk) => !isStar || talk.isFavorite).map((talk) => (
          <TalkTitleCard key={talk.talkID} {...talk} />
        ))}
      </div>
    </div>
  );
}
