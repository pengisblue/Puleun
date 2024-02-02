import axios from "axios";
import plus from "../asset/plus_slate.svg";
import cog from "../asset/cog-8-tooth.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KidCard from "../components/Kids/KidCard";
import PotAddDetailCard from "../components/Pots/PotAddDetailCard";

export default function KidListPage() {
  const [kidList, setKidList] = useState([]);

  const navigate = useNavigate();

  const goCreateKid = function () {
    navigate("/kid/create");
  };

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
  }, []);

  return (
    <div>
      <header className="m-2 flex items-center justify-between">
        <h1 className="text-title">아이 목록</h1>
        <div className="flex gap-2">
          <img src={plus} alt="plus" className="w-7" onClick={goCreateKid} />
          <img src={cog} alt="cog" className="w-7" />
        </div>
      </header>

      <div className="my-6 grid w-full grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4">
        {kidList.map((kid) => (
          <KidCard key={kid.userId} nickname={kid.nickname}></KidCard>
        ))}
        <PotAddDetailCard></PotAddDetailCard>
      </div>
    </div>
  );
}
