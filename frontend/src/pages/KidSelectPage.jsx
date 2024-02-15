import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import BaseSimpleCard from "../components/UI/BaseSimpleCard";


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
    <div className="px-6">
      <div className="my-6 grid w-full grid-cols-2 place-items-center">
        {kidList.map((kid) => (
          <div
            key={kid.user_id}
            onClick={goKidsMode(kid.user_id)}
            className="cursor-pointer"
          >
            <BaseSimpleCard>
              <div className="flex h-full flex-col justify-evenly">
                {/* 아이 사진 */}
                <div className="mx-auto w-full overflow-hidden rounded-lg">
                  <div className="flex aspect-square items-center overflow-hidden">
                    <img
                      src={kid.profile_img_url}
                      alt="potImg"
                      className="min-h-full min-w-full object-cover"
                    />
                  </div>
                </div>

                {/* 아이 이름 */}
                <div className="flex items-center gap-2">
                  <div className="text- basis-3/4">{kid.nickname}</div>
                </div>
              </div>
            </BaseSimpleCard>
          </div>
        ))}
      </div>
    </div>
  );
}
