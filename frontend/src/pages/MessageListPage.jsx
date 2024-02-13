import MessageTitleCard from "../components/Message/MessageTitleCard";
import cog from "../asset/cog-8-tooth.svg";
import { useState } from "react";

// 테스트 데이터
import { TALK_LIST } from "../test/talkList";

export default function MeassageListPage() {
  const [isStar, setIsStar] = useState(false);

  return (
    <div className="">
      <div className="fixed top-16 w-full max-w-page bg-amber-overlay pt-2">
        <div className="left-0 m-2 flex items-center justify-between px-6">
          <h1 className="text-title">알람 목록</h1>
          <img src={cog} alt="cog" className="w-7 cursor-pointer" />
        </div>
      </div>

      {/* 대화 목록 */}
      <div className="mx-2 flex flex-wrap gap-1 px-6 pt-28">
        {TALK_LIST.filter((talk) => !isStar || talk.isFavorite).map((talk) => (
          <MessageTitleCard key={talk.talkID} {...talk} />
        ))}
      </div>
    </div>
  );
}
