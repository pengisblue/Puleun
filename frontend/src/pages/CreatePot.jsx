import DeviceChoice from "../components/Devices/DeviceChoice";

export default function CreatePot() {
  return (
    <div>
      <header>
        <h1 className="m-2 text-title">식물 심기</h1>
      </header>

      <div>
        <label htmlFor="">화분 선택</label>
        <DeviceChoice />
      </div>
      
      <div>
        <label htmlFor="">주인 선택</label>
      </div>

      <div>
        <label htmlFor="">
          식물 애칭
        </label>
      </div>

      <div>
        <label htmlFor="">
          품종
        </label>
      </div>
    </div>
  );
}
