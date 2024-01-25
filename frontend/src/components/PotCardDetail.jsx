import PotCardStyle from "./PotCardDetailStyle";

export default function PotDetail({
  kidName, potName, potImgUrl, potSpecies, nowTemprature, tempratureStatus, nowMoisture, moistureStatus, daysSinceWatering, plantDate, daysSincePlanting
}) {
  return (
    <PotCardStyle>
      <div className="flex flex-col p-3">
        <h1
          className=""
        >
          {kidName}'s {potName}
        </h1>
        <div className="flex h-full">
          <div className="h-full">
          <img 
            src={potImgUrl} alt="plantImg" 
            className=""
          />
          </div>
          <ul>
            <li>품종: {potSpecies}</li>
            <li>
              현재 온도: {nowTemprature}℃{" "}
              <span>({tempratureStatus})</span>
            </li>
            <li>
              현재 습도: {nowMoisture}%{" "}
              <span>({moistureStatus})</span>
            </li>
            <li>물 준 날: {daysSinceWatering}</li>
            <li>심은 날: {plantDate}</li>
            <li>
              <span>{daysSincePlanting}</span>일째 함께하는 중
            </li>
          </ul>
        </div>
      </div>
    </PotCardStyle>
  );
}
