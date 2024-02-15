import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KidProfileImage from "../components/Kids/KidProfileImage";
import PotSimpleCard from "../components/Pots/PotSimpleCard";
import Button from "../components/UI/Button";

// 하드코딩용
import kidImg from "../test/kid1.png";

export default function KidDetailPage() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    user_id: userId,
    profile_img_url: "",
    nickname: "",
    birth_DT: "",
    gender: "",
    parent_id: 0,
    pots: [],
  });
  const navigate = useNavigate();

  const goDetailPot = (pot_id) => {
    return () => navigate(`/pot/${pot_id}`);
  };

  const goCollection = (user_id) => {
    return () => navigate(`/collection/${user_id}`);
  };

  const deleteKid = async () => {
    try {
      const response = await axios.delete(
        `https://i10e101.p.ssafy.io/v1/user/${userId}`,
      );
      // console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      navigate("/kids");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `https://i10e101.p.ssafy.io/v1/user/${userId}`,
        );
        setUser(response.data);
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
            <KidProfileImage imgUrl={user.profile_img_url} />
          </div>
          <div className="col-span-4 flex justify-center">
            <ul className="text-base font-semibold">
              <li className="pb-1">
                <span>이름: {user.nickname}</span>
              </li>
              <li className="py-2">
                <span>생년월일: {user.birth_DT}</span>
              </li>
              <li className="py-2">
                <span>성별: {user.gender}</span>
              </li>
              <li className="py-2">
                <Button
                  onClick={goCollection(userId)}
                  className="bg-amber-300 text-white hover:bg-amber-400"
                >
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
                  className="w-36"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="mb-12 mt-6 flex flex-col gap-4">
        <Button
          onClick={deleteKid}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          아이 삭제
        </Button>
      </div>
    </div>
  );
}
