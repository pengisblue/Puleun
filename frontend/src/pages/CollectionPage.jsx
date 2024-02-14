import PotProfileImage from "../components/Pots/PotProfileImage";
import BaseSimpleCard from "../components/UI/BaseSimpleCard";
import chevron from "../asset/chevron-left.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function CollectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const handleBack = () => {
    if (location.state?.from) {
      navigate(-1);
    } else {
      navigate(`/kid/${params.userId}`);
    }
  };

  const [collectionInfo, setCollectionInfo] = useState({
    nickname: "",
    pots: {}
  });

  const userId = params.userId

  // 이름이 받침으로 끝나는지 확인
  function hasCoda(name) {
    const lastChar = name.charAt(name.length - 1); // 이름의 마지막 글자
    const uni = lastChar.charCodeAt(0); // 마지막 글자의 유니코드
    // 한글의 유니코드 범위(0xAC00 ~ 0xD7A3) 내에 있고, 마지막 글자가 받침을 가지는지 확인
    if (uni >= 0xac00 && uni <= 0xd7a3) {
      return (uni - 0xac00) % 28 === 0;
    }
    return true;
  }

  // 이름 뒤의 조사 선택
  function selectPostposition(name) {
    return hasCoda(name) ? "의" : "이의";
  }

  // axios
  useEffect(() => {
    const getCollectionInfo = async () => {
      try {
        const response = await axios.get(
          `https://i10e101.p.ssafy.io/v1/pot/collection/${userId}`,
        );
        // console.log(response.data)
        setCollectionInfo(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getCollectionInfo();
  }, [userId]);

  return (
    <div className="px-6">
      <div className="flex gap-2">
        {/* 뒤로가기 */}
        <img
          onClick={handleBack}
          src={chevron}
          alt="back"
          className="w-8 cursor-pointer"
        />
        <div>
          {collectionInfo.nickname && 
            <span className="font-semibold">
              {collectionInfo.nickname}
              {selectPostposition(collectionInfo.nickname)}
            </span>
          }
          {/* <span className="font-semibold">
            {collectionInfo.nickname}
            {selectPostposition(collectionInfo.nickname)}
          </span> */}
          <h1 className="text-title">컬렉션</h1>
        </div>
      </div>

      {/* 컬렉션 리스트 */}
      {collectionInfo.pots.length > 0 ? (
        <div className="grid grid-cols-2">
          {collectionInfo.pots.map((pot) => (
            <BaseSimpleCard key={pot.pot_name} className="w-[9.5rem]">
              <div className="overflow-hidden rounded-lg">
                <PotProfileImage imgUrl={pot.pot_img_url} />
              </div>
              <ul className="mt-2">
                <li>
                  <p className="font-semibold">{pot.pot_name}</p>
                </li>
                <li>
                  <span className="me-2">함께한 날:</span>
                  <span className="me-0.5 text-xl font-bold text-emerald-600">
                    {pot.together_day}
                  </span>
                  <span>일</span>
                </li>
                <li>
                  <span className="me-2">행복한 날:</span>
                  <span className="me-0.5 text-xl font-bold text-emerald-600">
                    {pot.happy_cnt}
                  </span>
                  <span>일</span>
                </li>
              </ul>
            </BaseSimpleCard>
          ))}
        </div>
      ) : (
        <div className="mt-6 mx-4 rounded-xl bg-emerald-50 p-6 text-center text-emerald-900 shadow-md">
          <p>아직 성장을 완료한 식물이 없네요.</p>
          <p className="font-semibold">
            식물을 키우고 컬렉션을 모아보세요!
          </p>
        </div>
      )}
    </div>
  );
}
