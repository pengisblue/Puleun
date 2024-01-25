import PotCardDetail from "./PotCardDetail";
import PotCardSimple from "./PotCardSimple";
import potImg1 from "../test/pot1.jpg";
import potImg2 from "../test/pot2.jpg";
import kidImg1 from "../test/kid1.png";
import kidImg2 from "../test/kid2.png";

const potList = [
  {
    potId: 1,
    kidImgUrl: kidImg1,
    kidName: "성주",
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
    kidName: "성주2",
    potName: "방울이2",
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
          <PotCardDetail {...pot} />
        ))}
      </div>
      <div>
        {potList.map((pot) => (
          <PotCardSimple {...pot} />
        ))}
      </div>
    </div>
  );
}
