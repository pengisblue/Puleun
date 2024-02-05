import Calander from "react-calendar";
import dayjs from "dayjs";
import waterImg from "../../asset/water.svg";
import talkImg from "../../asset/chat-bubble.svg";
import "react-calendar/dist/Calendar.css";
import "./PotCalander.css";

export default function PotCalander({ wateringDayList, talkDayList }) {
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
    return <div className="flex items-center justify-center p-1">{contents}</div>;
  };

  return (
    <>
      <Calander
        calendarType="US"
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
