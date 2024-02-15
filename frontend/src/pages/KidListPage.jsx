import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import plus from "../asset/plus_slate.svg";
import KidCard from "../components/Kids/KidCard";
import AddSimpleCard from "../components/UI/AddSimpleCard";

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

  useEffect(() => {
    const getKids = async () => {
      try {
        const response = await axios.get(
          `https://i10e101.p.ssafy.io/v1/user/child/${userInfo.userId}`,
        );

        response.data.pop();
        setKidList(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getKids();
  }, [userInfo.userId, kidList]);

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

      <div className="my-6 grid w-full grid-cols-2 place-items-center">
        {kidList.map((kid) => (
          <div
            key={kid.user_id}
            onClick={goDetailKid(kid.user_id)}
            className="cursor-pointer"
          >
            <KidCard
              nickname={kid.nickname}
              profile_img_url={kid.profile_img_url}
              className="w-36"
            ></KidCard>
          </div>
        ))}
        <div onClick={goCreateKid} className="cursor-pointer">
          <AddSimpleCard text={kidList.length === 0 ? <>
            <p>아이를</p><p>추가해주세요</p>
          </> : <><p>아이 추가하기</p></>} className="w-40" />
        </div>
      </div>
    </div>
  );
}
