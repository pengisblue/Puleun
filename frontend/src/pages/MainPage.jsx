import PotDetailCard from "../components/Pots/PotDetailCard";
import PotAddDetailCard from "../components/Pots/PotAddDetailCard";
import { potDetailList } from "../test/potList";

export default function MainPage() {
  return (
    <>
      <div>
        <div>
          <div className="m-2">
            <h1 className="text-2xl font-semibold">우리 화분</h1>
          </div>

          {potDetailList.map((pot) => (
            <PotDetailCard key={pot.potId} {...pot} />
          ))}
          <PotAddDetailCard />
        </div>

        <div>
          <h1>최근 대화</h1>
        </div>
      </div>
    </>
  );
}
