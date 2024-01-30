import DetailCard from "../UI/DetailCard";
import plus from "../../asset/plus_circle_amber.svg";

export default function PotAddDetail() {
  return (
    <DetailCard>
      <div className="flex h-full flex-col items-center justify-center">
        <img src={plus} alt="plus" className="w-1/4" />
        <p className="text-lg font-semibold text-amber-600">화분 추가하기</p>
      </div>
    </DetailCard>
  );
}
