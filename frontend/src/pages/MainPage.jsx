import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import PotSwiper from "../components/Pots/PotSwiper";
import TalkTitleCard from "../components/Talk/TalkTitleCard";
import chevron from "../asset/chevron-right.svg";
import { API_URL } from "../config/config";

// 하드코딩 테스트용 데이터
import { potDetailList } from "../test/potList";

export default function MainPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const goPotList = function () {
    navigate("/pot");
  };

  const goTalkList = function () {
    navigate("/talk");
  };

  const [talkList, setTalkList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/talk/bookmark/${userInfo.userId}`)
      .then((res) => {
        setTalkList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo.userId]);

  return (
    <div className="flex flex-col gap-8 px-6">
      {/* 화분 상태 요약 */}
      <section>
        <div
          onClick={goPotList}
          className="mb-3 flex cursor-pointer items-center justify-between"
        >
          <h1 className="text-title">우리 화분</h1>
          <img src={chevron} alt="goPotList" className="w-8 cursor-pointer" />
        </div>
        <div className="flex items-center">
          <PotSwiper potList={potDetailList} />
        </div>
      </section>

      {/* 새로운 대화 */}
      <section>
        <div
          onClick={goTalkList}
          className="mb-3 flex cursor-pointer items-center justify-between"
        >
          <h1 className="text-title">새로운 대화</h1>
          <img src={chevron} alt="goTalkList" className="w-8 cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-1">
          {talkList.length > 0 ? (
            talkList.map((talk) => (
              <TalkTitleCard key={talk.talk_id} {...talk} />
            ))
          ) : (
            <div
              className="m-4 flex aspect-[16/5] w-80 items-center justify-center overflow-hidden rounded-lg bg-amber-50 text-xl 
              font-semibold text-amber-600 shadow-lg ring ring-amber-200 ring-offset-1 ring-offset-amber-300"
            >
              <p>아직 새로운 대화가 없어요!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
