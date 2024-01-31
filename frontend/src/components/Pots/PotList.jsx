import PotSimpleCard from "./PotSimpleCard";
import PotAddSimpleCard from "./PotAddSimpleCard";
import plus from "../../asset/plus_slate.svg";
import cog from "../../asset/cog-8-tooth.svg";
import { potSimpleList } from "../../test/potList";
import { userList } from "../../test/userList";
import { useEffect, useState } from "react";

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

export default function PotList() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredPots, setFilteredPots] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      setFilteredPots(
        potSimpleList.filter((pot) => pot.userId === selectedUser),
      );
    } else {
      setFilteredPots(potSimpleList);
    }
  }, [selectedUser]);

  const handleUserChange = (event) => {
    console.log(event.target.value);
    setSelectedUser(Number(event.target.value));
  };

  return (
    <div className="">
      <header className="m-2 flex items-center justify-between">
        <h1 className="text-title">화분 목록</h1>
        <div className="flex gap-2">
          <img src={plus} alt="plus" className="w-7" />
          <img src={cog} alt="cog" className="w-7" />
        </div>
      </header>

      {/* 주인 선택 필터 */}
      <div className="mx-auto mt-8 w-11/12">
        <select
          onChange={handleUserChange}
          className="ms-auto block w-full max-w-60 rounded-md border-gray-300 text-gray-600 shadow-sm
        focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
        >
          <option value="">전체</option>
          {userList.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.userName}
            </option>
          ))}
        </select>
      </div>

      {/* 화분 카드 */}
      <div className="my-6 grid w-full grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4">
        {filteredPots.map((pot) => (
          <PotSimpleCard key={pot.potId} {...pot} />
        ))}
        <PotAddSimpleCard />
      </div>
    </div>
  );
}
