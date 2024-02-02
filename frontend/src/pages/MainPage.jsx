import PotDetailCard from "../components/Pots/PotDetailCard";
import PotAddDetailCard from "../components/Pots/PotAddDetailCard";
import chevron from "../asset/chevron-right.svg";
import { useNavigate } from "react-router-dom";

// 하드코딩 테스트용 데이터
import { potDetailList } from "../test/potList";

export default function MainPage() {
  const navigate = useNavigate();

  const goPotList = function () {
    navigate("/pot");
  };

  const goCreatPot = function () {
    navigate("/pot/create");
  };

  return (
    <>
      <div>
        {/* 화분 상태 요약 */}
        <section>
          <div className="m-2 flex justify-between">
            <h1 className="text-2xl font-semibold">우리 화분</h1>
            <img src={chevron} alt="goPotList" onClick={goPotList} />
          </div>

          {potDetailList.map((pot) => (
            <PotDetailCard key={pot.potId} {...pot} />
          ))}
          <div onClick={goCreatPot} className="hover:cursor-pointer">
            <PotAddDetailCard />
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
