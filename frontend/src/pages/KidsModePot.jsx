import { useState } from "react";
import { Tab } from "@headlessui/react";
import PotKidsModeCard from "../components/Pots/PotKidsModeCard";
import PotCalander from "../components/Pots/PotCalander";

// 하드코딩용
import { potDetailList } from "../test/potList";
import { CALANDER } from "../test/calander";

export default function KidsModePot() {
  const [calInfo, setCalInfo] = useState(CALANDER);
  const handleCalInfo = () => {
    setCalInfo(CALANDER);
  };

  return (
    <Tab.Group>
      {/* 화분 리스트 */}
      <div className="flex justify-center">
        <Tab.List className="mb-4 flex flex-wrap justify-evenly gap-4 rounded-lg bg-green-700/25 p-1">
          {potDetailList.map((pot) => (
            <Tab
              key={pot.potId}
              className={({ selected }) =>
                `${selected ? "bg-slate-50 font-semibold text-green-900 shadow-md outline-none ring-4 ring-green-100 ring-offset-2 ring-offset-green-300" : "text-gray-50"}  rounded-lg p-2 text-lg`
              }
            >
              {pot.potName}
            </Tab>
          ))}
        </Tab.List>
      </div>

      {/* 화분 상세 정보 */}
      <Tab.Panels>
        {potDetailList.map((pot) => (
          <Tab.Panel key={pot.potId}>
            <PotKidsModeCard {...pot} />
            {/* 캘린더 */}
            <section>
              <h2 className="mb-2 text-section">함께 한 기록</h2>
              <div className="max-w-[30rem] overflow-hidden rounded-xl border shadow-md">
                <PotCalander
                  wateringDayList={calInfo.water}
                  talkDayList={calInfo.talk}
                />
              </div>
            </section>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
