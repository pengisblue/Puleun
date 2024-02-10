import BaseSimpleCard from "../UI/BaseSimpleCard";
import plus from "../../asset/plus_circle_emerald.svg";

export default function PotAddSimpleCard({className}) {
  return (
    <BaseSimpleCard className={className}>
      <div className="flex h-full flex-col items-center justify-center">
        <img src={plus} alt="plus" className="w-3/5" />
        <p className="font-semibold text-emerald-600">화분 추가하기</p>
      </div>
    </BaseSimpleCard>
  );
}
