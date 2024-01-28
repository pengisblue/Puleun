// import PotCardDetail from "./PotCardDetail";
import PotCardSimple from "./PotCardSimple";
import plus from "../asset/plus_slate.svg";
import cog from "../asset/cog-8-tooth.svg";
import potImg1 from "../test/plant1.png";
import potImg2 from "../test/plant2.png";
import kidImg1 from "../test/kid1.png";
import kidImg2 from "../test/kid2.png";
// import PotAddDetail from "./PotAddDetail";
import PotAddSimple from "./PotAddSimple";

const userList = [
  {
    userId: 1,
    userName: "성준"
  },
  {
    userId: 2,
    userName: "성주성주성주성주성2"
  }
]

const potList = [
  {
    potId: 1,
    kidImgUrl: kidImg1,
    kidName: "성준",
    potName: "방울이",
    potImgUrl: potImg1,
    potSpecies: "방울토마토",
    nowTemprature: 22,
    tempratureStatus: "적정",
    nowMoisture: 50,
    moistureStatus: "적정",
    daysSinceWatering: 3,
    plantDate: "2024-01-12",
    daysSincePlanting: 14,
  },
  {
    potId: 2,
    kidImgUrl: kidImg2,
    kidName: "성주성주성주성주성2",
    potName: "방울방울방울방울방울",
    potImgUrl: potImg2,
    potSpecies: "방울토마토",
    nowTemprature: 22,
    tempratureStatus: "적정",
    nowMoisture: 50,
    moistureStatus: "적정",
    daysSinceWatering: 3,
    plantDate: "2024-01-12",
    daysSincePlanting: 14,
  },
];

export default function PotList() {
  return (
    <div className="pt-16">
      <header className="mx-6 my-4 flex justify-between items-center">
        <h1 className="text-title">화분 목록</h1>
        <div className="flex gap-2">
          <img src={plus} alt="plus" className="w-7" />
          <img src={cog} alt="cog" className="w-7" />
        </div>
      </header>

      <div>
        <select className="form-select">
          <option>전체</option>
          {userList.map((user) => (
            <option key={user.userId}>{user.userName}</option>
          ))}
        </select>
      </div>

      {/* 화분 카드 */}
      <div className="mx-auto my-6 flex w-10/12 flex-wrap">
        {potList.map((pot) => (
          <PotCardSimple key={pot.potId} {...pot} />
        ))}
        <PotAddSimple />
      </div>
    </div>
  );
}
