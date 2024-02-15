import { useSelector } from "react-redux";
import PotSwiper from "../components/Pots/PotSwiper";
import TalkTitleCard from "../components/Talk/TalkTitleCard";
import chevron from "../asset/chevron-right.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import { API_URL } from "../config/config";

// 하드코딩 테스트용 데이터
// import { potDetailList } from "../test/potList";

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

import _ from 'lodash';

export const changeKeysToCamelCase = (obj) => {
  if (_.isArray(obj)) {
    return obj.map(value => changeKeysToCamelCase(value));
  }
  else if (_.isObjectLike(obj)) {
    return _.mapValues(_.mapKeys(obj, (value, key) => _.camelCase(key)), changeKeysToCamelCase);
  }
  return obj;
};

export default function MainPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const goPotList = function () {
    navigate("/pot");
  };

  const goTalkList = function () {
    navigate("/talk");
  };

  // parentId 로컬
  // const [parentId, setParentId] = useState("");

    // pot_id: 0,
    // pot_name: "",
    // pot_species: "",
    // pot_img_url: "",
    // temperature: 0,
    // moisture: 0,
    // planting_day: "",
    // user: {},
    // statusDto: {}

  const [talkList, setTalkList] = useState([]);
  const [potDetailList, setPotDetailList] = useState([]);
  


  // axios - 화분 정보
  useEffect(() => {
    const getPotDetailList = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/pot/${userInfo.userId}`,
        );
        const result = changeKeysToCamelCase(res.data);
        setPotDetailList(result);
        console.log(potDetailList)
      } catch (e) {
        console.log(e);
      }
    };
    getPotDetailList();
  }, [potDetailList]);


  
  // 대화
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
        <div className="flex flex-wrap justify-center gap-1">
          {talkList.map((talk) => (
            <TalkTitleCard key={talk.talk_id} {...talk} />
          ))}
        </div>
      </section>
    </div>
  );
}
