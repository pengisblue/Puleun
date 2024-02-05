import PotDetailCard from "../components/Pots/PotDetailCard";
import PotCalander from "../components/Pots/PotCalander";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 하드코딩용
import { potDetailList } from "../test/potList";
import { CALANDER } from "../test/calander";

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
    setCalInfo(CALANDER)
  }

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
        <PotCalander wateringDayList={claInfo.water} talkDayList={claInfo.talk} />
      </section>

      {/* 온,습도 그래프 */}

      {/* 테스트 */}
      <div>
        <button onClick={handleCalInfo}>test</button>
        <pre>{JSON.stringify(claInfo, null, 2)}</pre>
      </div>
    </div>
  );
}
