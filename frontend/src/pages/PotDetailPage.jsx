import PotDetailCard from "../components/Pots/PotDetailCard";
import PotCalander from "../components/Pots/PotCalander";
import PotChart from "../components/Pots/PotChart";
import Button from "../components/UI/Button";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";

// 화분 상태정보 = {
//   화분 아이디,
//   화분 이름,
//   주인 이름,
//   화분 이미지,
//   품종,
//   현재 온도,
//   현재 습도,
//   온도 상태,
//   습도 상태,
//   물 준 날(가장 최근),
//   심은 날
// }
// 캘린더 = {
//   물준 날짜,
//   대화한 날짜
// }
// 온,습도 = {
//   온도: [
//     {
//       x: 시간,
//       y: 온도
//     }
//   ],
//   습도: [
//     {
//       x: 시간,
//       y: 습도
//     }
//   ]
// }

export default function PotDetailPage() {
  const { potId } = useParams();
  const navigate = useNavigate();

  // params가 숫자인지 확인
  const [potInfo, setPotInfo] = useState({});
  useEffect(() => {
    if (isNaN(potId)) {
      navigate("/error");
    }

    const getPotInfo = async (potId) => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/pot/detail/${potId}`,
        });

        const potInfo = {
          potId: potId,
          potName: res.data.pot_name,
          userId: res.data.user_id,
          userName: res.data.nickname,
          potImgUrl: API_URL + res.data.pot_img_url,
          potSpecies: res.data.pot_species,
          nowTemprature: res.data.temperature,
          tempratureStatus: res.data.temp_state,
          nowMoisture: res.data.moisture,
          moistureStatus: res.data.mois_state,
          daysSinceWatering: res.data.last_water,
          plantDate: dayjs(res.data.planting_day).format("YY/MM/DD"),
          daysSincePlanting: res.data.together_day,
        };

        setPotInfo(potInfo);
      } catch (err) {
        console.log(err);
      }
    };

    getPotInfo(potId);
  }, [potId, navigate]);

  // 화분 그래프
  const [potStatus, setPotStatus] = useState({ temperature: [], moisture: [] });
  useEffect(() => {
    const getPotStatus = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/pot-state/yesterday/${potId}`,
        });

        console.log(res.data);
        const data = {
          temperature: res.data.temperature.map((item) => ({
            mesure_DT: item.measure_DT.replace("T", " ").replace(".000Z", ""),
            data: item.data,
          })),
          moisture: res.data.moisture.map((item) => ({
            mesure_DT: item.measure_DT.replace("T", " ").replace(".000Z", ""),
            data: item.data,
          })),
        };
        setPotStatus(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPotStatus();
  }, [potId]);

  // 이름이 받침으로 끝나는지 확인
  function hasCoda(name) {
    if (!name) {
      return false;
    }
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

  return (
    <div className="flex flex-col gap-4 px-6">
      <h1 className="mt-2 text-xl font-bold">
        <span className="me-2">
          {potInfo.userName}
          {selectPostposition(potInfo.userName)}
        </span>
        <span>{potInfo.potName}</span>
      </h1>
      {/* 화분 상태 정보 */}
      <div className="flex justify-center">
        <PotDetailCard
          {...potInfo}
          className="h-44 w-80"
          nameDisplay="hidden"
        />
      </div>

      {/* 캘린더 */}
      <section>
        <h2 className="mb-2 text-section">함께 한 기록</h2>
        <div className="max-w-[30rem] overflow-hidden rounded-xl border shadow-md">
          <PotCalander />
        </div>
      </section>

      {/* 온,습도 그래프 */}
      <section>
        <div className="mb-4">
          <h2 className="mb-2 text-section">어제의 온도</h2>
          <div className="flex w-full justify-center rounded-xl border bg-white shadow-md">
            <div className="w-11/12  overflow-auto">
              <div className="h-96 min-w-[48rem] bg-white">
                <PotChart
                  potData={potStatus.temperature}
                  id="온도"
                  scheme="pastel1"
                  type="temperature"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-section">어제의 습도</h2>
          <div className="flex w-full justify-center rounded-xl border bg-white shadow-md">
            <div className="w-11/12  overflow-auto">
              <div className="h-96 min-w-[48rem] bg-white">
                <PotChart
                  potData={potStatus.moisture}
                  id="습도"
                  scheme="paired"
                  type="moisture"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 성장완료 버튼 */}
      <div className="mt-6 grid place-items-center">
        <Button className="w-32 bg-amber-300 text-white hover:bg-amber-400">
          성장완료
        </Button>
      </div>
    </div>
  );
}
