import PotCardDetail from "./PotCardDetail";
import PotCardSimple from "./PotCardSimple";
import potImg1 from "../test/plant1.png";
import potImg2 from "../test/plant2.png";
import kidImg1 from "../test/kid1.png";
import kidImg2 from "../test/kid2.png";

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
    <div>
      <div>
        {potList.map((pot) => (
          <PotCardDetail key={pot.potId} {...pot} />
        ))}
      </div>
      <div className="flex w-5/6 mx-auto flex-wrap">
        {potList.map((pot) => (
          <PotCardSimple key={pot.potId} {...pot} />
        ))}
      </div>
    </div>
  );
}
