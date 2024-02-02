import axios from "axios";
import { useEffect, useState } from "react";
import KidCard from "../components/Kids/KidCard";
import PotAddDetailCard from "../components/Pots/PotAddDetailCard";

export default function KidListPage() {
  const [kidList, setKidList] = useState([]);

  useEffect(() => {
    const getKids = async () => {
      try {
        const response = await axios.get(
          "https://i10e101.p.ssafy.io/v1/user/child/1",
        );
        console.log(response);
        setKidList(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getKids();
  });

  return (
    <>
      <div>
        <div>
          <div className="m-2">
            <h1 className="text-2xl font-semibold">우리 애기</h1>
          </div>

          {kidList.map((kid) => (
            <KidCard key={kid.userId} nickname={kid.nickname}></KidCard>
          ))}
          <PotAddDetailCard></PotAddDetailCard>
        </div>
      </div>
    </>
  );
}
