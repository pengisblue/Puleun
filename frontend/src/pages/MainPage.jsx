import PotSwiper from "../components/Pots/PotSwiper";
import chevron from "../asset/chevron-right.svg";
import { useNavigate } from "react-router-dom";

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
//   물 준 날,
//   심은 날
// }

export default function MainPage() {
  const navigate = useNavigate();

  const goPotList = function () {
    navigate("/pot");
  };

  return (
    <>
      <div>
        {/* 화분 상태 요약 */}
        <section>
          <div className="m-2 flex justify-between">
            <h1 className="text-2xl font-semibold">우리 화분</h1>
            <img
              src={chevron}
              alt="goPotList"
              onClick={goPotList}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center">
            <PotSwiper potList={potDetailList} />
          </div>
        </section>

        {/* 새로운 대화 */}
        <section>
          <h1>새로운 대화</h1>
        </section>
      </div>
    </>
  );
}
