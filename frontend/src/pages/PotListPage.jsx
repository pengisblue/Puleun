import PotSimpleCard from "../components/Pots/PotSimpleCard";
import PotAddSimpleCard from "../components/Pots/PotAddSimpleCard";
import Filter from "../components/UI/Filter";
import plus from "../asset/plus_slate.svg";
import cog from "../asset/cog-8-tooth.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 하드코딩 테스트용 데이터
import { potSimpleList } from "../test/potList";
import { userList } from "../test/userList";

// api1 = {
//   화분 아이디,
//   화분 이름,
//   화분 사진,
//   주인 아이디,
//   주인 사진
// },
// api2 = {
//   유저 아이디,
//   유저 이름
// }

export default function PotListPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredPots, setFilteredPots] = useState([]);
  const navigate = useNavigate();

  // 화분 상세정보로 이동
  const goPotDetail = function (potId) {
    return () => navigate(`/pot/${potId}`);
  };

  // 화분 추가하기로 이동
  const goCreatPot = function () {
    navigate("/pot/create");
  };

  // 주인 필터링 확인
  useEffect(() => {
    if (selectedUser) {
      setFilteredPots(
        potSimpleList.filter((pot) => pot.userId === selectedUser),
      );
    } else {
      setFilteredPots(potSimpleList);
    }
  }, [selectedUser]);

  // 필터링된 주인 화분만 띄우기
  const handleUserChange = (value) => {
    console.log(value);
    setSelectedUser(value);
  };

  return (
    <div className="">
      <header className="m-2 flex items-center justify-between">
        <h1 className="text-title">화분 목록</h1>
        <div className="flex gap-2">
          <img
            src={plus}
            alt="plus"
            className="w-7 hover:cursor-pointer"
            onClick={goCreatPot}
          />
          <img src={cog} alt="cog" className="w-7 hover:cursor-pointer" />
        </div>
      </header>

      {/* 주인 선택 필터 */}
      <div className="ms-auto w-60">
        <Filter
          targetList={userList}
          filterKey="userId"
          filterValue="userId"
          option="userName"
          onFilterChange={handleUserChange}
          allTarget={true}
        />
      </div>

      {/* 화분 카드 */}
      <div className="my-6 grid w-full grid-cols-2 place-items-center">
        {filteredPots.map((pot) => (
          <div
            key={pot.potId}
            onClick={goPotDetail(pot.potId)}
            className="cursor-pointer"
          >
            <PotSimpleCard {...pot} />
          </div>
        ))}
        <div onClick={goCreatPot} className="cursor-pointer">
          <PotAddSimpleCard />
        </div>
      </div>
    </div>
  );
}
