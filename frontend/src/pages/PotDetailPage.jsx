import PotDetailCard from "../components/Pots/PotDetailCard";
import PotCalander from "../components/Pots/PotCalander";
import PotChart from "../components/Pots/PotChart";
import Button from "../components/UI/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 하드코딩용
import { potDetailInfo } from "../test/potList";
import { CALANDER } from "../test/calander";
import { potStatus as potStatusInfo } from "../test/potData";

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
// 캘린더 = {
//   물준 날짜,
//   대화한 날짜
// }
// 온,습도 = {
//   온도: [
//     {
//       x: 시간,
//       y: 온도
//     }
//   ],
//   습도: [
//     {
//       x: 시간,
//       y: 습도
//     }
//   ]
// }

export default function PotDetailPage() {
  const [potInfo, setPotInfo] = useState({});
  const { potId } = useParams();
  const navigate = useNavigate();

  // params가 숫자인지 확인
  useEffect(() => {
    if (isNaN(potId)) {
      navigate("/error");
    }

    const getPotInfo = async (potId) => {
      try {
        const response = await axios.get(
          `https://i10e101.p.ssafy.io/v1/pot/detail/${potId}`,
        );
        setPotInfo(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getPotInfo(potId);
  }, [potId, navigate]);

  // 하드코딩용
  const pot = potDetailInfo;

  const [calInfo, setCalInfo] = useState(CALANDER);
  const handleCalInfo = () => {
    setCalInfo(CALANDER);
  };

  const [potStatus, setPotStatus] = useState(potStatusInfo);
  const handlePotStatus = () => {
    setPotStatus(potStatusInfo);
  };

  // 이름이 받침으로 끝나는지 확인
  function hasCoda(name) {
    const lastChar = name.charAt(name.length - 1); // 이름의 마지막 글자
    const uni = lastChar.charCodeAt(0); // 마지막 글자의 유니코드
    // 한글의 유니코드 범위(0xAC00 ~ 0xD7A3) 내에 있고, 마지막 글자가 받침을 가지는지 확인
    if (uni >= 0xac00 && uni <= 0xd7a3) {
      return (uni - 0xac00) % 28 === 0;
    }
    return true;
  }

  // 이름 뒤의 조사 선택
  function selectPostposition(name) {
    return hasCoda(name) ? "의" : "이의";
  }

  return (
    <div className="flex flex-col gap-4 px-6">
      <h1 className="text-xl font-bold mt-2">
        <span className="me-2">
          {pot.userName}
          {selectPostposition(pot.userName)}
        </span>
        <span>{pot.potName}</span>
      </h1>
      {/* 화분 상태 정보 */}
      <div className="flex justify-center">
        <PotDetailCard {...pot} size="w-80 h-44" nameDisplay="hidden" />
      </div>

      {/* 캘린더 */}
      <section>
        <h2 className="text-section mb-2">함께 한 기록</h2>
        <div className="max-w-[30rem] overflow-hidden rounded-xl border shadow-md">
          <PotCalander
            wateringDayList={calInfo.water}
            talkDayList={calInfo.talk}
          />
        </div>
      </section>

      {/* 온,습도 그래프 */}
      <section>
        <div className="mb-4">
          <h2 className="text-section mb-2">어제의 온도</h2>
          <div className="flex w-full justify-center rounded-xl border bg-white shadow-md">
            <div className="w-11/12  overflow-auto">
              <div className="h-96 min-w-[48rem] bg-white">
                <PotChart
                  potData={potStatus.temperature}
                  id="온도"
                  scheme="pastel1"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-section mb-2">어제의 습도</h2>
          <div className="flex w-full justify-center rounded-xl border bg-white shadow-md">
            <div className="w-11/12  overflow-auto">
              <div className="h-96 min-w-[48rem] bg-white">
                <PotChart
                  potData={potStatus.moisture}
                  id="습도"
                  scheme="paired"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 성장완료 버튼 */}
      <div className="grid place-items-center mt-6">
        <Button className="w-32 bg-amber-300 text-white hover:bg-amber-400">
          성장완료
        </Button>
      </div>

      {/* 테스트 */}
      <div>
        <button onClick={handleCalInfo}>test</button>
        {/* <pre>{JSON.stringify(calInfo, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(potStatus, null, 2)}</pre> */}
        <button onClick={handlePotStatus}>test2</button>
      </div>
    </div>
  );
}
