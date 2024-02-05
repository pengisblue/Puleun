import PotDetailCard from "../components/Pots/PotDetailCard";
import PotCalander from "../components/Pots/PotCalander";
import PotChart from "../components/Pots/PotChart";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 하드코딩용
import { potDetailList } from "../test/potList";
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
  const { potId } = useParams();
  const navigate = useNavigate();

  // params가 숫자인지 확인
  useEffect(() => {
    if (isNaN(potId)) {
      navigate("/error");
    }
  }, [potId, navigate]);

  // 하드코딩용
  const pot = potDetailList[potId - 1];

  const [claInfo, setCalInfo] = useState(CALANDER);
  const handleCalInfo = () => {
    setCalInfo(CALANDER);
  };

  const [potStatus, setPotStatus] = useState(potStatusInfo);
  const handlePotStatus = () => {
    setPotStatus(potStatusInfo);
  };

  return (
    <div>
      <h1>
        {pot.userName}, {pot.potName}
      </h1>
      {/* 화분 상태 정보 */}
      <PotDetailCard {...pot} size="w-80 h-44" display="hidden" />

      {/* 캘린더 */}
      <section>
        <h2>함께 한 기록</h2>
        <div className="max-w-[30rem] overflow-hidden rounded-xl border">
          <PotCalander
            wateringDayList={claInfo.water}
            talkDayList={claInfo.talk}
          />
        </div>
      </section>

      {/* 온,습도 그래프 */}
      <section>
        <div>
          <h2>어제의 온도</h2>
          <div className="w-[30rem] overflow-auto">
            <div className="h-96 min-w-[48rem] bg-white">
              <PotChart
                potData={potStatus.temperature}
                id="온도"
                scheme="pastel1"
              />
            </div>
          </div>
        </div>
        <div>
          <h2>어제의 습도</h2>
          <div className="w-[30rem] overflow-auto">
            <div className="h-96 min-w-[48rem] bg-white"> 
              <PotChart
                potData={potStatus.moisture}
                id="습도"
                scheme="paired"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 테스트 */}
      <div>
        <button onClick={handleCalInfo}>test</button>
        {/* <pre>{JSON.stringify(claInfo, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(potStatus, null, 2)}</pre> */}
        <button onClick={handlePotStatus}>test2</button>
      </div>
    </div>
  );
}
