import PotSwiper from "../components/Pots/PotSwiper";
import TalkTitleCard from "../components/Talk/TalkTitleCard";
import chevron from "../asset/chevron-right.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";


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

export default function MainPage() {
  const navigate = useNavigate();

  const goPotList = function () {
    navigate("/pot");
  };

  const goTalkList = function () {
    navigate("/talk");
  };

  // parentId 로컬
  // const [parentId, setParentId] = useState("");

  const [talkList, setTalkList] = useState([]);
  const [potDetailList, setPotDetailList] = useState({
    // pot_id: 0,
    // pot_name: "",
    // pot_species: "",
    // pot_img_url: "",
    // temperature: 0,
    // moisture: 0,
    // planting_day: "",
    // user: {},
    // statusDto: {}
  });
  


  // axios - 화분 정보
  useEffect(() => {
    const getPotDetailList = async () => {
      try {
        const res = await axios.get(
          `https://i10e101.p.ssafy.io/v1/pot/${JSON.parse(localStorage.getItem("userInfo")).userId}`,
        );
        console.log(res.data)
        const potDetail = {
          potId: res.data.pot_id,
          potName: res.data.pot_name,
          // userName: res.data.user.nickname,
          // userImgUrl: res.data.user.profile_img_url, // test
          potImgUrl: res.data.pot_img_url,
          potSpecies: res.data.pot_species,
          nowTemprature: res.data.temperature,
          // tempratureStatus: res.data.statusDto.temp_state,
          nowMoisture: res.data.moisture,
          // moistureStatus: res.data.statusDto.mois_state,
          // daysSinceWatering: res.data.statusDto.lastWaterDay,
          plantDate: dayjs(res.data.planting_day).format("YY/MM/DD"),
          // daysSincePlanting: res.data.statusDto.together_day,
        }
        setPotDetailList(potDetail);
      } catch (e) {
        console.log(e);
      }
    };
    getPotDetailList();
  }, []);


  
  // 대화
  useEffect(() => {
    axios
      .get(
        `https://i10e101.p.ssafy.io/v1/talk/all/${JSON.parse(localStorage.getItem("userInfo")).userId}`,
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
