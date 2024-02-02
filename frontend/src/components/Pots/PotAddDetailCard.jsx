import BaseDetailCard from "../UI/BaseDetailCard";
import plus from "../../asset/plus_circle_amber.svg";

export default function PotAddDetailCard() {
  return (
    <BaseDetailCard>
      <div className="flex flex-col items-center justify-center">
        <img src={plus} alt="plus" className="w-18" />
        <p className="text-lg font-semibold text-amber-600">화분 추가하기</p>
      </div>
    </BaseDetailCard>
  );
}
