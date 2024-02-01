import DeviceChoice from "../components/Devices/DeviceChoice";
import SpeciesSelector from "../components/Pots/SpeciesSelector";
import Filter from "../components/UI/Filter";
import { useState } from "react";

// 하드코딩 테스트용 데이터
import { userList } from "../test/userList";
import { plantList } from "../test/plantList";

export default function CreatePot() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [potName, setPotName] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(plantList[0]);   // 선택된 품종

  // 주인 선택
  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  // 화분 애칭
  const handlePotNameInput = (event) => {
    setPotName(event.target.value);
  };

  return (
    <div>
      <h1 className="mx-2 my-4 text-title">식물 심기</h1>

      <div className="mt-6 flex flex-col gap-4">
        {/* 기기 선택 */}
        <section>
          <label htmlFor="">화분 선택</label>
          <DeviceChoice />
        </section>

        {/* 주인 선택 */}
        <section>
          <label htmlFor="">주인 선택</label>
          <div>
            <Filter
              targetList={userList}
              filterKey="userId"
              filterValue="userId"
              option="userName"
              onFilterChange={handleUserChange}
              allTarget={false}
            />
          </div>
        </section>

        {/* 임시 확인용 */}
        <span>{selectedUser}</span>

        {/* 애칭 입력 */}
        <section>
          <label htmlFor="">식물 애칭</label>
          <input
            type="text"
            onInput={handlePotNameInput}
            className="mt-2 block w-full rounded-lg border-gray-100 text-gray-800 shadow-md
            focus:border-amber-100 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
          />
        </section>

        {/* 임시 확인용 */}
        <span>{potName}</span>

        {/* 품종 선택 */}
        <section>
          <label htmlFor="">품종</label>
          <div className="mt-2">
            <SpeciesSelector plantList={plantList} onSelect={setSelectedPlant} selectedPlant={selectedPlant} />
          </div>
        </section>

        {/* 임시 확인용 */}
        <pre>{JSON.stringify(selectedPlant, null, 2)}</pre>

        
      </div>
    </div>
  );
}
