import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 하드코딩용
import { potDetailList } from "../test/potList";
import PotDetailCard from "../components/Pots/PotDetailCard";

export default function PotDetailPage() {
  const { potId } = useParams();
  const navigate = useNavigate();

  // params가 숫자인지 확인
  useEffect(() => {
    if (isNaN(potId)) {
      navigate("/error");
    }
  }, [potId, navigate]);

  // 하드코딩용
  const pot = potDetailList[potId];

  return (
    <div>
      <h1>{pot.userName}, {pot.potName}</h1>
      <PotDetailCard {...pot}/>
    </div>
  );
}
