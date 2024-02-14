import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import plus from "../asset/plus_slate.svg";
import KidCard from "../components/Kids/KidCard";
import AddDetailCard from "../components/UI/AddDetailCard";

export default function KidListPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [kidList, setKidList] = useState([]);

  const goDetailKid = (user_id) => {
    return () => navigate(`/kid/${user_id}`);
  };

  const goCreateKid = () => {
    navigate("/kid/create");
  };

  const handledList = () => {
    const result = [];

    for (let i = 0; i < kidList.length - 1; i++) {
      result.push(
        <div
          key={kidList[i].user_id}
          onClick={goDetailKid(kidList[i].user_id)}
          className="cursor-pointer"
        >
          <KidCard
            nickname={kidList[i].nickname}
            profile_img_url={kidList[i].profile_img_url}
            className="h-44 w-80"
            display="hidden"
          ></KidCard>
        </div>,
      );
    }

    return result;
  };

  useEffect(() => {
    const getKids = async () => {
      try {
        const response = await axios.get(
          `https://i10e101.p.ssafy.io/v1/user/child/${userInfo.userId}`,
        );
        setKidList(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getKids();
  }, [userInfo.userId]);

  return (
    <div className="px-6">
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

      <div className="my-6 grid w-full grid-cols-1 place-items-center">
        {handledList()}
        <div onClick={goCreateKid} className="cursor-pointer">
          <AddDetailCard text="아이 추가하기" className="h-44 w-80" />
        </div>
      </div>
    </div>
  );
}
