import Calander from "react-calendar";
import dayjs from "dayjs";
import waterImg from "../../asset/water.svg";
import talkImg from "../../asset/chat-bubble.svg";
import "react-calendar/dist/Calendar.css";
import "./PotCalander.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config/config";
import { useParams } from "react-router-dom";

export default function PotCalander() {
  const { potId } = useParams();
  const [wateringDayList, setWateringDayList] = useState([]);
  const [talkDayList, setTalkDayList] = useState([]);

  useEffect(() => {
    const getCalInfo = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/calender/${potId}`,
        });

        const convertedData = res.data.reduce(
          (acc, item) => {
            const date = dayjs(item.createdAt).format("YYYY-MM-DD");

            if (item.code === "T") {
              acc.talkDayList.push(date);
            } else if (item.code === "W") {
              acc.wateringDayList.push(date);
            }

            return acc;
          },
          { talkDayList: [], wateringDayList: [] },
        );

        setWateringDayList(convertedData.wateringDayList);
        setTalkDayList(convertedData.talkDayList);
      } catch (err) {
        console.log(err);
      }
    };
    getCalInfo();
  }, [potId]);

  // 물 준 날 대화한 날 아이콘 삽입
  const ContentInfo = ({ date }) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const contents = []; // 여기에 아이콘을 넣음
    // 물 준 날
    if (wateringDayList.find((wateringDay) => wateringDay === formattedDate)) {
      contents.push(
        <>
          <img src={waterImg} alt="waterImg" className="w-4" />
        </>,
      );
    }
    // 대화한 날
    if (talkDayList.find((talkDay) => talkDay === formattedDate)) {
      contents.push(
        <>
          <img src={talkImg} alt="talkImg" className="w-4" />
        </>,
      );
    }
    return (
      <div className="flex items-center justify-center p-1">{contents}</div>
    );
  };

  return (
    <>
      <div className="me-6 mt-2 flex justify-end gap-3">
        <div className="flex items-center rounded-xl bg-lime-200/60 px-2 py-1">
          <span>물 준 날</span>
          <img src={waterImg} alt="waterImg" className="ms-1 w-4" />
        </div>
        <div className="flex items-center rounded-xl bg-lime-200/60 px-2 py-1">
          <span>대화한 날</span>
          <img src={talkImg} alt="talkImg" className="w-4" />
        </div>
      </div>
      <Calander
        calendarType="gregory"
        locale="ko"
        minDetail="year"
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => dayjs(date).format("D")}
        tileContent={ContentInfo}
      />
    </>
  );
}
