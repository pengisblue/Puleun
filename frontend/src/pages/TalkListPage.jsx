import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import TalkTitleCard from "../components/Talk/TalkTitleCard";
import cog from "../asset/cog-8-tooth.svg";
import Filter from "../components/UI/Filter";
import { API_URL } from "../config/config";

export default function TalkListPage() {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [isStar, setIsStar] = useState(false);
  const handleClickAll = () => {
    setIsStar(false);
  };
  const handleClickFavorite = () => {
    setIsStar(true);
  };

  const [talkList, setTalkList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredTalks, setFilteredTalks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // 대화 리스트
    axios
      .get(`${API_URL}/talk/all/${userInfo.userId}`)
      .then((res) => {
        setTalkList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // 유저 리스트 (필터목록)
    axios
      .get(`${API_URL}/user/child/${userInfo.userId}`)
      .then((res) => {
        const userList = res.data.map((item) => ({
          userId: item.user_id,
          userName: item.nickname,
        }));
        setUserList(userList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo.userId, isStar]);

  // 전체 보기, 즐겨찾기
  useEffect(() => {
    // isStar 상태값이 변경될 때마다 필터링을 수행합니다.
    if (isStar) {
      setFilteredData(talkList.filter((item) => item.star_FG === 1)); // isStar가 true일 때, star_FG가 1인 데이터만 필터링
    } else {
      setFilteredData(talkList); // isStar가 false일 때, 모든 데이터를 표시
    }
  }, [isStar, talkList]);

  // 주인 필터링 확인
  useEffect(() => {
    if (selectedUser) {
      setFilteredTalks(
        filteredData.filter((talk) => talk.pot.user.user_id === selectedUser),
      );
    } else {
      setFilteredTalks(filteredData);
    }
  }, [selectedUser, filteredData, isStar]);

  // 필터링된 주인 화분만 띄우기
  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  // 대화 즐겨찾기
  const handleStar = (talk_id) => {
    axios({
      method: "put",
      url: `${API_URL}/talk/bookmark/${talk_id}`,
    })
      .then((res) => {
        setTalkList(
          talkList.map((talk) => {
            if (talk.talk_id === talk_id) {
              return { ...talk, star_FG: talk.star_FG === 1 ? 0 : 1 };
            } else {
              return talk;
            }
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <div className="fixed top-16 w-full max-w-page bg-amber-overlay pt-2">
        <div className="left-0 m-2 flex items-center justify-between px-6">
          <h1 className="text-title">우리 대화</h1>
          <img src={cog} alt="cog" className="w-7 cursor-pointer" />
        </div>

        {/* 전체 | 즐겨찾기 필터 */}
        <div className="flex border-amber-300 text-center text-xl font-semibold">
          <p
            onClick={handleClickAll}
            className={`basis-1/2 cursor-pointer py-3 ${isStar ? "text-amber-cloudy" : "text-slate-950"}`}
          >
            전체
          </p>
          <div className="my-3 box-border w-0.5 bg-amber-300"></div>
          <p
            onClick={handleClickFavorite}
            className={`basis-1/2 cursor-pointer py-3 ${isStar ? "text-slate-950" : "text-amber-cloudy"}`}
          >
            즐겨찾기
          </p>
        </div>
      </div>

      {/* 주인 선택 필터 */}
      <div className="ms-auto w-60 px-6 pt-28">
        <Filter
          targetList={userList}
          filterKey="userId"
          filterValue="userId"
          option="userName"
          onFilterChange={handleUserChange}
          allTarget={true}
        />
      </div>

      {/* 대화 목록 */}
      <div className="mx-2 flex flex-wrap gap-1 px-6 pt-8">
        {filteredTalks.length > 0 ? (
          filteredTalks
            .filter((talk) => !isStar || talk.star_FG)
            .map((talk) => (
              <TalkTitleCard
                key={talk.talk_id}
                handleStar={handleStar}
                {...talk}
              />
            ))
        ) : (
          <div
            className="m-4 flex aspect-[16/5] w-80 items-center justify-center overflow-hidden rounded-lg bg-amber-50 text-xl 
              font-semibold text-amber-600 shadow-lg ring ring-amber-200 ring-offset-1 ring-offset-amber-300"
          >
            <p>아직 새로운 대화가 없어요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
