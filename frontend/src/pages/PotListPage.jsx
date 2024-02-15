import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import PotSimpleCard from "../components/Pots/PotSimpleCard";
import AddSimpleCard from "../components/UI/AddSimpleCard";
import Filter from "../components/UI/Filter";
import plus from "../asset/plus_slate.svg";
import cog from "../asset/cog-8-tooth.svg";
import { API_URL } from "../config/config";

export default function PotListPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [potList, setPotList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredPots, setFilteredPots] = useState([]);

  // 화분 상세정보로 이동
  const goPotDetail = function (potId) {
    return () => navigate(`/pot/${potId}`);
  };

  // 화분 추가하기로 이동
  const goCreatPot = function () {
    navigate("/pot/create");
  };

  // axios 요청
  useEffect(() => {
    // 전체 화분 리스트
    // 16번 사용자로 로그인한 경우 (로그인 로직 구현 후 수정해야함)
    axios
      .get(`${API_URL}/pot/${userInfo.userId}`)
      .then((res) => {
        const potList = res.data.map((item) => ({
          potId: item.pot_id,
          potName: item.pot_name,
          potImgUrl: item.pot_img_url,
          userId: item.user.user_id,
          userImgUrl: item.user.profile_img_url,
        }));
        setPotList(potList);
      })
      .catch((err) => {
        console.log(err);
      });

    // 유저 리스트 (필터목록)
    // 16번 사용자로 로그인한 경우 (로그인 로직 구현 후 수정해야함)
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
  }, [potList, userInfo.userId]);

  // 주인 필터링 확인
  useEffect(() => {
    if (selectedUser) {
      setFilteredPots(potList.filter((pot) => pot.userId === selectedUser));
    } else {
      setFilteredPots(potList);
    }
  }, [selectedUser, potList]);

  // 필터링된 주인 화분만 띄우기
  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  return (
    <div className="px-6">
      <header className="m-2 flex items-center justify-between">
        <h1 className="text-title">화분 목록</h1>
        <div className="flex gap-2">
          <img
            src={plus}
            alt="plus"
            className="w-7 hover:cursor-pointer"
            onClick={goCreatPot}
          />
          <img src={cog} alt="cog" className="w-7 hover:cursor-pointer" />
        </div>
      </header>

      {/* 주인 선택 필터 */}
      <div className="ms-auto mt-6 w-60">
        <Filter
          targetList={userList}
          filterKey="userId"
          filterValue="userId"
          option="userName"
          onFilterChange={handleUserChange}
          allTarget={true}
        />
      </div>

      {/* 화분 카드 */}
      <div className="my-6 grid w-full grid-cols-2 place-items-center">
        {filteredPots.map((pot) => (
          <div
            key={pot.potId}
            onClick={goPotDetail(pot.potId)}
            className="cursor-pointer"
          >
            <PotSimpleCard {...pot} className="w-40" />
          </div>
        ))}
        <div onClick={goCreatPot} className="cursor-pointer">
          <AddSimpleCard
            className="w-40"
            text={
              filteredPots.length === 0 ? (
                <>
                  <p>화분을</p>
                  <p>추가해주세요</p>
                </>
              ) : (
                <>
                  <p>화분 추가하기</p>
                </>
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
