import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import BaseSimpleCard from "../components/UI/BaseSimpleCard";
import KidCard from "../components/Kids/KidCard";

export default function KidSelectPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [kidList, setKidList] = useState([]);

  const goKidsMode = (id) => {
    return () => navigate(`/kidsmode/${id}`);
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
    <div >
      <h1 className="my-4 text-2xl text-center font-semibold">주인 선택하기</h1>
      <div className="my-2 grid w-full grid-cols-2 place-items-center">
        {kidList.map((kid) => (
          <div
            key={kid.user_id}
            onClick={goKidsMode(kid.user_id)}
            className="cursor-pointer"
          >
            <KidCard
              nickname={kid.nickname}
              profile_img_url={kid.profile_img_url}
              className="w-36"
            ></KidCard>
          </div>
        ))}
      </div>
    </div>
  );
}
