import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KidCard from "../components/Kids/KidCard";
import PotDetailCard from "../components/Pots/PotDetailCard";
import kidImg from "../test/kid1.png";

export default function KidDetailPage() {
  const { user_id } = useParams();
  const [user, setUser] = useState({
    userId: user_id,
    nickname: "",
    birthDT: "",
    gender: "",
    profileImgUrl: "",
    parentId: 0,
    pots: [],
  });
  const navigate = useNavigate();

  const goDetailPot = (pot_id) => {
    return () => navigate(`/pot/${pot_id}`);
  };

  const goCreatePot = () => {
    navigate("/pot/create");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `https://i10e101.p.ssafy.io/v1/user/${user_id}`,
        );
        setUser(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [user_id]);

  return (
    // <div>
    //   <div className="mb-12 mt-6 flex flex-col gap-4">
    //     <div className="grid grid-flow-row-dense grid-cols-8 gap-2">
    //       <div className="col-span-3">
    //         <KidProfileImage imgUrl={kidImg} />
    //       </div>
    //       <div className="col-span-5">
    //         <ul className="text-sm">
    //           <li>
    //             <span>{user.nickname}</span>
    //           </li>
    //           <li>
    //             <span>{user.birthDT}</span>
    //           </li>
    //           <li>
    //             <span>{user.gender}</span>
    //           </li>
    //           <li>대화 보기 버튼</li>
    //         </ul>
    //       </div>
    //     </div>
    //     <section>
    //       <span>성장 중인 화분</span>
    //       <div className="my-6 grid w-full grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4">
    //         {user.pots.map((pot) => (
    //           <div
    //             key={pot.potId}
    //             onClick={goDetailPot(pot.potId)}
    //             className="cursor-pointer"
    //           >
    //             <PotSimpleCard {...pot} />
    //           </div>
    //         ))}
    //         <div onClick={goCreatePot} className="cursor-pointer">
    //           <PotAddSimpleCard />
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </div>
    <div>
      <h1>아이 정보</h1>
      <KidCard
        nickname={user.nickname}
        profile_img_url={kidImg}
        size="w-80 h-44"
        display="hidden"
      ></KidCard>
      <h1>화분 정보</h1>
      {/* <PotDetailCard {...pot} size="w-80 h-44" display="hidden" /> */}
    </div>
  );
}
