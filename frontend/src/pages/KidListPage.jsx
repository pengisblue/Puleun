import axios from "axios";
import { useEffect, useState } from "react";
import plus from "../asset/plus_slate.svg";
import KidCard from "../components/Kids/KidCard";
import { useNavigate } from "react-router-dom";

export default function KidListPage() {
  const [kidList, setKidList] = useState([]);
  const navigate = useNavigate();

  const goCreateKid = () => {
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
    <div className="">
      <header className="m-2 flex items-center justify-between">
        <h1 className="text-title">아이 목록</h1>
        <div className="flex gap-2">
          <img
            src={plus}
            alt="plus"
            className="w-7 hover:cursor-pointer"
            onClick={goCreateKid}
          />
        </div>
      </header>
      <div className="my-6 grid w-full grid-cols-3 place-items-center gap-3 md:grid-cols-3 lg:grid-cols-3">
        {kidList.map((kid) => (
          <KidCard key={kid.userId} nickname={kid.nickname}></KidCard>
        ))}
      </div>
    </div>
  );
}
