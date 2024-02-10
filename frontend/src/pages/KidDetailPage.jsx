import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KidProfileImage from "../components/Kids/KidProfileImage";
import PotSimpleCard from "../components/Pots/PotSimpleCard";
import kidImg from "../test/kid1.png";
import Button from "../components/UI/Button";

export default function KidDetailPage() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    userId: userId,
    userImgUrl: "",
    nickname: "",
    birthDT: "",
    gender: "",
    parentId: 0,
    pots: [],
  });
  const navigate = useNavigate();

  const goDetailPot = (pot_id) => {
    return () => navigate(`/pot/${pot_id}`);
  };

  const goCollection = (userId) => {
    return () => navigate(`/collection/${userId}`)
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `https://i10e101.p.ssafy.io/v1/user/${userId}`,
        );
        // console.log(response.data)
        setUser({
          ...response.data,
          userId: response.data.user_id,
          userImgUrl: response.data.profile_img_url,
          birthDT: response.data.birth_DT,
          parentId: response.data.parent_id,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [userId]);

  return (
    <div className="px-6">
      <div className="mb-12 mt-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold">아이 정보</h1>
        <div className="grid grid-flow-row-dense grid-cols-8 gap-2">
          <div className="col-span-4">
            <KidProfileImage imgUrl={kidImg} />
          </div>
          <div className="col-span-4 flex justify-center">
            <ul className="text-base font-semibold">
              <li className="pb-1">
                <span>이름: {user.nickname}</span>
              </li>
              <li className="py-2">
                <span>생년월일: {user.birthDT}</span>
              </li>
              <li className="py-2">
                <span>성별: {user.gender}</span>
              </li>
              <li className="py-2">
                <Button 
                onClick={goCollection(userId)}
                className="bg-amber-300 text-white hover:bg-amber-400">
                  컬렉션 바로가기
                </Button>
              </li>
              <li className="py-2">
                <Button className="bg-green-400 text-white hover:bg-green-500">
                  대화 바로가기
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <section className="mt-5">
          <h1 className="text-xl font-bold">화분 정보</h1>
          <div className="my-6 grid w-full grid-cols-2 place-items-center">
            {user.pots.map((pot) => (
              <div
                key={pot.pot_id}
                onClick={goDetailPot(pot.pot_id)}
                className="cursor-pointer"
              >
                <PotSimpleCard
                  userImgUrl={user.profile_img_url}
                  potName={pot.pot_name}
                  potImgUrl={pot.pot_img_url}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
