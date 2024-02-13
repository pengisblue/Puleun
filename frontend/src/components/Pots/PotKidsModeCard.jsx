import { useEffect, useState } from "react";
import BaseDetailCard from "../UI/BaseDetailCard";
import PotProfileImage from "./PotProfileImage";

export default function PotKidsModeCard({
  // 화분 정보
  potName,
  potImgUrl,
  potSpecies,
  tempratureStatus,
  moistureStatus,
  daysSinceWatering,
  plantDate,
  daysSincePlanting,
  // css 정보
  className,
}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let newMessages = [];
    if (tempratureStatus !== "적정") {
      newMessages.push(
        tempratureStatus === "낮음" ? "온도가 낮아요" : "온도가 높아요",
      );
    }
    if (moistureStatus !== "적정") {
      newMessages.push(moistureStatus === "부족" ? "목이 말라요" : "배불러요");
    }
    if (tempratureStatus === "적정" && moistureStatus === "적정") {
      newMessages.push("기분이 좋아요");
    }
    setMessages(newMessages);
  }, [tempratureStatus, moistureStatus]);

  return (
    <BaseDetailCard className={className}>
      <div className="grid grid-cols-12 place-content-center gap-1">
        <h1 className={`col-span-12 flex flex-wrap font-bold `}>{potName}</h1>

        <div className="col-span-5 place-self-center overflow-hidden rounded-xl">
          <PotProfileImage imgUrl={potImgUrl} />
        </div>

        <ul className="col-span-6 col-start-7 text-sm font-semibold">
          <li>
            품종: <span>{potSpecies}</span>
          </li>
          <li>
            물 준 날: <span>{daysSinceWatering}</span>일 전
          </li>
          <li>
            심은 날: <span>{plantDate}</span>
          </li>
          <li className="mt-2">
            <span>지금은, </span>
            <span>
              {messages.map((message, index) => (
                <p className="text-base font-bold text-blue-900" key={index}>{message}</p>
              ))}
            </span>
          </li>
          <li>
            <span className="text-xl font-bold text-green-500">
              {daysSincePlanting}
            </span>
            일째 함께하는 중
          </li>
        </ul>
      </div>
    </BaseDetailCard>
  );
}
