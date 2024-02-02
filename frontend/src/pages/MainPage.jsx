import chevron from "../asset/chevron-right.svg";
import { useNavigate } from "react-router-dom";

// 하드코딩 테스트용 데이터
import { potDetailList } from "../test/potList";
import PotSwiper from "../components/Pots/PotSwiper";

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
