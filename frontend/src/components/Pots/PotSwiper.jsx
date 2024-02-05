import PotDetailCard from "./PotDetailCard";
import AddDetailCard from "../UI/AddDetailCard";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function PotSwiper({ potList }) {
  const navigate = useNavigate();

  const goCreatPot = function () {
    navigate("/pot/create");
  };

  return (
    <Swiper slidesPerView={"auto"} loop={false}>
      {potList.map((pot) => (
        <SwiperSlide key={pot.potId} className="w-auto-important me-2">
          <PotDetailCard {...pot}/>
        </SwiperSlide>
      ))}
      <SwiperSlide className="w-auto-important me-4">
        <div onClick={goCreatPot} className="cursor-pointer">
          <AddDetailCard text="화분 추가하기"  size="w-80 h-48"/>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
