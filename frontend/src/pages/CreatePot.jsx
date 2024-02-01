import DeviceChoice from "../components/Devices/DeviceChoice";
import Filter from "../components/UI/Filter";
import { userList } from "../test/userList";
import { useState } from "react";

export default function CreatePot() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [potName, setPotName] = useState(null);

  // 주인 선택
  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  // 화분 애칭
  const handlePotNameInput = (event) => {
    setPotName(event.target.value)
  };

  return (
    <div>
      <h1 className="mx-2 my-4 text-title">식물 심기</h1>

      <div className="mt-6 flex flex-col gap-8">
        {/* 기기 선택 */}
        <section>
          <label htmlFor="">화분 선택</label>
          <DeviceChoice />
        </section>

        {/* 주인 선택 */}
        <section>
          <label htmlFor="">주인 선택</label>
          <Filter
            targetList={userList}
            filterKey="userId"
            filterValue="userId"
            option="userName"
            onFilterChange={handleUserChange}
            allTarget={false}
          />
        </section>

        {/* 임시 확인용 */}
        <span>{selectedUser}</span>

        {/* 애칭 입력 */}
        <section>
          <label htmlFor="">식물 애칭</label>
          <input
            type="text"
            onInput={handlePotNameInput}
            className="mt-2 block w-full rounded-md border-gray-300 text-gray-600 shadow-sm
            focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
          />
        </section>

        {/* 임시 확인용 */}
        <span>{potName}</span>

        {/* 품종 선택 */}
        <section>
          <label htmlFor="">품종</label>
        </section>
      </div>
    </div>
  );
}
