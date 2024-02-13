import TalkTitleCard from "../components/Talk/TalkTitleCard";
import PotDetailCard from "../components/Pots/PotDetailCard";
import PotCalander from "../components/Pots/PotCalander";
import PotChart from "../components/Pots/PotChart";
import Button from "../components/UI/Button";
import PotProfileImage from "../components/Pots/PotProfileImage";
import BaseSimpleCard from "../components/UI/BaseSimpleCard";
import chevron from "../asset/chevron-left.svg";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// 테스트 데이터
import { TALK_LIST } from "../test/talkList";
import { potDetailInfo } from "../test/potList";
import { CALANDER } from "../test/calander";
import { potStatus as potStatusInfo } from "../test/potData";
import { COLLECTION_INFO } from "../test/collectionInfo";

export default function KidsmodePage() {
  const [isCollection, setIsCollection] = useState(false);
  const handleClickPot = () => {
    setIsCollection(false);
  };
  const handleClickCollection = () => {
    setIsCollection(true);
    };
    
    const pot = potDetailInfo;

  const [calInfo, setCalInfo] = useState(CALANDER);
  const handleCalInfo = () => {
    setCalInfo(CALANDER);
  };

  const [potStatus, setPotStatus] = useState(potStatusInfo);
  const handlePotStatus = () => {
    setPotStatus(potStatusInfo);
  };

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

  const [collectionInfo, setCollectionInfo] = useState(COLLECTION_INFO);
  const { userName, potList } = collectionInfo;
  
    const showCollection = () => {
        const result = [];

        if (isCollection) {
            result.push(<div className="px-6 pt-28">
            {/* 컬렉션 리스트 */}
            {potList.length > 0 ? (
              <div className="grid grid-cols-2">
                {potList.map((pot) => (
                  <BaseSimpleCard key={pot.potId} className="w-[9.5rem]">
                    <div className="overflow-hidden rounded-lg">
                      <PotProfileImage imgUrl={pot.potImg} />
                    </div>
                    <ul className="mt-2">
                      <li>
                        <p className="font-semibold">{pot.potName}</p>
                      </li>
                      <li>
                        <span className="me-2">함께한 날:</span>
                        <span className="me-0.5 text-xl font-bold text-emerald-600">
                          {pot.togetherDay}
                        </span>
                        <span>일</span>
                      </li>
                      <li>
                        <span className="me-2">행복한 날:</span>
                        <span className="me-0.5 text-xl font-bold text-emerald-600">
                          {pot.happyCnt}
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
            )}</div>);
          
        } else {
            result.push(<div className="flex flex-col gap-4 px-6">
                <h1 className="text-xl font-bold mt-2">
                    <span className="me-2">
                        {pot.userName}
                        {selectPostposition(pot.userName)}
                    </span>
                    <span>{pot.potName}</span>
                </h1>
                {/* 화분 상태 정보 */}
                <div className="flex justify-center">
                    <PotDetailCard {...pot} size="w-80 h-44" nameDisplay="hidden" />
                </div>
      
                {/* 캘린더 */}
                <section>
                    <h2 className="text-section mb-2">함께 한 기록</h2>
                    <div className="max-w-[30rem] overflow-hidden rounded-xl border shadow-md">
                        <PotCalander
                            wateringDayList={calInfo.water}
                            talkDayList={calInfo.talk}
                        />
                    </div>
                </section>
      
                {/* 온,습도 그래프 */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-section mb-2">어제의 온도</h2>
                        <div className="flex w-full justify-center rounded-xl border bg-white shadow-md">
                            <div className="w-11/12  overflow-auto">
                                <div className="h-96 min-w-[48rem] bg-white">
                                    <PotChart
                                        potData={potStatus.temperature}
                                        id="온도"
                                        scheme="pastel1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-section mb-2">어제의 습도</h2>
                        <div className="flex w-full justify-center rounded-xl border bg-white shadow-md">
                            <div className="w-11/12  overflow-auto">
                                <div className="h-96 min-w-[48rem] bg-white">
                                    <PotChart
                                        potData={potStatus.moisture}
                                        id="습도"
                                        scheme="paired"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
      
                {/* 성장완료 버튼 */}
                <div className="grid place-items-center mt-6">
                    <Button className="w-32 bg-amber-300 text-white hover:bg-amber-400">
                        성장완료
                    </Button>
                </div>
      
                {/* 테스트 */}
                <div>
                    <button onClick={handleCalInfo}>test</button>
                    {/* <pre>{JSON.stringify(calInfo, null, 2)}</pre> */}
                    {/* <pre>{JSON.stringify(potStatus, null, 2)}</pre> */}
                    <button onClick={handlePotStatus}>test2</button>
                </div>
            </div>);
        }
        
        return result;
  }

  return (
    <div className="">
      <div className="fixed top-16 w-full max-w-page bg-amber-overlay pt-2">
        <div className="flex border-amber-300 text-center text-xl font-semibold">
          <p
            onClick={handleClickPot}
            className={`basis-1/2 cursor-pointer py-3 ${isCollection ? "text-amber-cloudy" : "text-slate-950"}`}
          >
            내 화분
          </p>
          <div className="my-3 box-border w-0.5 bg-amber-300"></div>
          <p
            onClick={handleClickCollection}
            className={`basis-1/2 cursor-pointer py-3 ${isCollection ? "text-slate-950" : "text-amber-cloudy"}`}
          >
            컬렉션
          </p>
        </div>
      </div>
      
      {showCollection()}
    </div>
  );
}
