import DeviceChoice from "../components/Devices/DeviceChoice";
import SpeciesSelector from "../components/Pots/SpeciesSelector";
import PotProfileImage from "../components/Pots/PotProfileImage";
import Filter from "../components/UI/Filter";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import defaultImg from "../asset/no_pot_img.png"
import { useState } from "react";

// 하드코딩 테스트용 데이터
import { userList } from "../test/userList";
import { plantList } from "../test/plantList";
import { deviceList } from "../test/deviceList";

// 기본 화분 이미지

// 화분 없는 등록된 기기 = {
//   기기 아이디,
//   기기 시리얼넘버,
//   기기 별명
// }
// 유저 목록 = {
//   유저 아이디,
//   유저 이름
// }
// 품종 정보 = {
//   품종 아이디,
//   품종 이름,
//   최고 온도,
//   최저 온도,
//   최고 습도,
//   최저 습도
// }

export default function PotCreatePage() {
  // 기기
  const [selectedDevice, setSelectedDevice] = useState(deviceList[0]);
  const handleSelectedDevice = (value) => {
    setSelectedDevice(value);
  };

  // 이미지
  const [preview, setPreview] = useState(defaultImg);
  const [inputImg, setInputImg] = useState(null);
  const handleInputImg = (event) => {
    const files = event.target.files;
    // console.log(files)
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      // console.log(reader)
      reader.onload = () => {
        setPreview(reader.result);
        setInputImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 주인
  const [selectedUser, setSelectedUser] = useState(null);
  const handleSelectedUser = (value) => {
    setSelectedUser(value);
  };

  // 화분 애칭
  const [potName, setPotName] = useState(null);
  const handlePotNameInput = (event) => {
    setPotName(event.target.value);
  };

  // 선택된 품종
  const [selectedPlant, setSelectedPlant] = useState(plantList[0]);

  // 세부 정보
  const [minTemperature, setMinTemperature] = useState(
    selectedPlant.minTemperature,
  );
  const [maxTemperature, setMaxTemperature] = useState(
    selectedPlant.maxTemperature,
  );
  const [minMoisture, setMinMoisture] = useState(selectedPlant.minMoisture);
  const [maxMoisture, setMaxMoisture] = useState(selectedPlant.maxMoisture);

  const handleSelectChange = (value) => {
    setSelectedPlant(value);
    setMinTemperature(value.minTemperature);
    setMaxTemperature(value.maxTemperature);
    setMinMoisture(value.minMoisture);
    setMaxMoisture(value.maxMoisture);
  };

  const handleMinTemperatureChange = (event) => {
    setMinTemperature(event.target.value);
  };
  const handleMaxTemperatureChange = (event) => {
    setMaxTemperature(event.target.value);
  };
  const handleMinMoistureChange = (event) => {
    setMinMoisture(event.target.value);
  };
  const handleMaxMoistureChange = (event) => {
    setMaxMoisture(event.target.value);
  };

  // 심은 날 (default = 오늘)
  const today = new Date().toISOString().split("T")[0];
  const [plantingDate, setPlantingDate] = useState(today);
  const handleDateChange = (event) => {
    setPlantingDate(event.target.value);
  };

  return (
    <div className="px-6">
      <h1 className="mx-2 my-4 text-title">식물 심기</h1>

      <div className="mt-6 flex flex-col gap-4">
        {/* 기기 선택 */}
        <section>
          <label className="text-section">화분 선택</label>
          <div className=" my-2 rounded-md bg-white p-6 shadow-md">
            <DeviceChoice
              deviceList={deviceList}
              onSelect={handleSelectedDevice}
              selectedDevice={selectedDevice}
            />
          </div>
        </section>

        <div className="grid grid-flow-row-dense grid-cols-8 gap-4">
          {/* 프로필 이미지 */}
          <div className="col-span-4 space-y-2">
            <div className="self-center border border-amber-400">
              <PotProfileImage imgUrl={preview} />
            </div>
            <input type="file" accept=".png, .jpg" onChange={handleInputImg} />
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            {/* 주인 선택 */}
            <section>
              <label className="text-section">주인 선택</label>
              <div>
                <Filter
                  targetList={userList}
                  filterKey="userId"
                  filterValue="userId"
                  option="userName"
                  onFilterChange={handleSelectedUser}
                  allTarget={false}
                />
              </div>
            </section>

            {/* 애칭 입력 */}
            <section>
              <label className="text-section">식물 애칭</label>
              <Input
                type="text"
                onChange={handlePotNameInput}
                className="w-full"
                required
              />
            </section>
          </div>
        </div>

        {/* 품종 선택 */}
        <section>
          <label className="text-section">품종</label>
          <div className="mt-2">
            <SpeciesSelector
              plantList={plantList}
              onSelect={handleSelectChange}
              selectedPlant={selectedPlant}
            />
          </div>
        </section>

        {/* 온,습도 정보 */}
        <section>
          <p className="text-section">세부 정보</p>

          <label className="mb-2 flex items-center gap-4">
            <span className="mt-2">온도: </span>
            <Input
              type="number"
              value={minTemperature}
              onChange={handleMinTemperatureChange}
              className="w-20 text-center"
              required
            />
            <span className="mt-2">~</span>
            <Input
              type="number"
              value={maxTemperature}
              onChange={handleMaxTemperatureChange}
              className="w-20 text-center"
              required
            />
          </label>
          <label className="flex items-center gap-4">
            <span className="mt-2">습도: </span>
            <Input
              type="number"
              value={minMoisture}
              onChange={handleMinMoistureChange}
              className="w-20 text-center"
              required
              max={100}
            />
            <span className="mt-2">~</span>
            <Input
              type="number"
              value={maxMoisture}
              onChange={handleMaxMoistureChange}
              className="w-20 text-center"
              required
              max={100}
            />
          </label>
        </section>

        {/* 심은 날 */}
        <section>
          <span className="text-section">심은 날</span>
          <Input
            type="date"
            value={plantingDate}
            onChange={handleDateChange}
            className="block"
            required
          />
        </section>
      </div>

      {/* 등록 버튼 */}
      <div className="mt-6 grid place-content-center">
        <Button
          className="w-40 bg-amber-300 text-white hover:bg-amber-400"
          isDisabled={false}
        >
          등록하기
        </Button>
      </div>

      {/* 임시 확인용 */}
      <pre>{JSON.stringify(selectedDevice, null, 2)}</pre>
      <span>프리뷰: {preview}</span>
      <span>인풋: {inputImg}</span>
      <span>{selectedUser}</span>
      <span>{potName}</span>
      <pre>{JSON.stringify(selectedPlant, null, 2)}</pre>
      <span>
        {minTemperature}/{maxTemperature}/{minMoisture}/{maxMoisture}
      </span>
      <span>{plantingDate}</span>
    </div>
  );
}
