import DetailCard from "../UI/DetailCard";
import PotProfileImage from "../UI/PotProfileImage";

export default function PotDetail({
  potId,
  userName,
  potName,
  potImgUrl,
  potSpecies,
  nowTemprature,
  tempratureStatus,
  nowMoisture,
  moistureStatus,
  daysSinceWatering,
  plantDate,
  daysSincePlanting,
}) {
  // 이름이 받침으로 끝나는지 확인
  function hasCoda(name) {
    const lastChar = name.charAt(name.length - 1); // 이름의 마지막 글자
    const uni = lastChar.charCodeAt(0); // 마지막 글자의 유니코드
    // 한글의 유니코드 범위(0xAC00 ~ 0xD7A3) 내에 있고, 마지막 글자가 받침을 가지는지 확인
    if (uni >= 0xac00 && uni <= 0xd7a3) {
      return (uni - 0xac00) % 28 === 0;
    }
    return true;
  }

  // 이름 뒤의 조사 선택
  function selectPostposition(name) {
    return hasCoda(name) ? "의" : "이의";
  }

  return (
    <DetailCard>
      <div className="flex flex-col gap-1">
        <h1 className="flex flex-wrap text-lg font-bold">
          <span className="me-2">
            {userName}
            {selectPostposition(userName)}
          </span>
          <span>{potName}</span>
        </h1>

        <div className="flex h-full items-center gap-4 font-semibold">
          <div className="basis-2/5 overflow-hidden rounded-xl">
            <PotProfileImage imgUrl={potImgUrl} />
          </div>

          <ul className="text-sm">
            <li>
              품종: <span>{potSpecies}</span>
            </li>
            <li>
              현재 온도: <span>{nowTemprature}℃</span>{" "}
              <span>({tempratureStatus})</span>
            </li>
            <li>
              현재 습도: <span>{nowMoisture}%</span>{" "}
              <span>({moistureStatus})</span>
            </li>
            <li>
              물 준 날: <span>{daysSinceWatering}</span>일 전
            </li>
            <li>
              심은 날: <span>{plantDate}</span>
            </li>
            <li>
              <span className="text-xl font-bold text-green-500">
                {daysSincePlanting}
              </span>
              일째 함께하는 중
            </li>
          </ul>
        </div>
      </div>
    </DetailCard>
  );
}
