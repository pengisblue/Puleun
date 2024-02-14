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

// 화분 상태정보 = {
//   화분 아이디,
//   화분 이름,
//   주인 이름,
//   화분 이미지,
//   품종,
//   현재 온도,
//   현재 습도,
//   온도 상태,
//   습도 상태,
//   물 준 날(가장 최근),
//   심은 날
// }

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
      .get(
        `${API_URL}/talk/all/${userInfo.userId}`,
      )
      .then((res) => {
        setTalkList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <div className="flex flex-wrap justify-center gap-1">
          {talkList.map((talk) => (
            <TalkTitleCard key={talk.talk_id} {...talk} />
          ))}
        </div>
      </section>
    </div>
  );
}
