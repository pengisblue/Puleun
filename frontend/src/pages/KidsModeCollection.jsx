import { useState } from "react";
import PotProfileImage from "../components/Pots/PotProfileImage";
import BaseSimpleCard from "../components/UI/BaseSimpleCard";

// 하드코딩용
import { COLLECTION_INFO } from "../test/collectionInfo";

export default function KidsModeCollection() {
  const [collectionInfo, setCollectionInfo] = useState(COLLECTION_INFO);
  const { potList } = collectionInfo;

  return (
    <div>
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
        <div className="mx-4 mt-6 rounded-xl bg-emerald-50 p-6 text-center text-emerald-900 shadow-md">
          <p>아직 성장을 완료한 식물이 없네요.</p>
          <p className="font-semibold">식물을 키우고 컬렉션을 모아보세요!</p>
        </div>
      )}

      <button onClick={() => setCollectionInfo(COLLECTION_INFO)}>지울거</button>
    </div>
  );
}
