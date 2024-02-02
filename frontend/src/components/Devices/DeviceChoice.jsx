import DeviceCard from "./DeviceCard";
import DeviceBaseCard from "../UI/DeviceBaseCard";
import DeviceAddCard from "./DeviceAddCard";
import radioOff from "../../asset/radio_off.svg";
import radioOn from "../../asset/radio_on.svg";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RadioGroup } from "@headlessui/react";
import "swiper/css";

// 하드코딩 테스트용 데이터
import { deviceList } from "../../test/deviceList";

// api = {
//   기기 아이디,
//   기기 별명,
//   시리얼번호
// }

export default function DeviceChoice() {
  const [selected, setSelected] = useState(deviceList[0]);

  const handleChange = function (value) {
    console.log(value);
    setSelected(value);
  };

  return (
    <RadioGroup value={selected} onChange={handleChange}>
      <Swiper spaceBetween={0} slidesPerView={1.7}>
        {/* 기기 목록 */}
        {deviceList.map((device) => (
          <SwiperSlide key={device.deviceId}>
            <RadioGroup.Option value={device} className="outline-none">
              {({ active, checked }) => (
                <DeviceBaseCard>
                  <div className="flex items-center gap-2">
                    <img
                      src={checked ? radioOn : radioOff}
                      alt="radio"
                      className="w-6"
                    />
                    <DeviceCard {...device} />
                  </div>
                </DeviceBaseCard>
              )}
            </RadioGroup.Option>
          </SwiperSlide>
        ))}

        {/* 기기 추가 */}
        <SwiperSlide key="deviceAdd">
          <DeviceAddCard />
        </SwiperSlide>
      </Swiper>
    </RadioGroup>
  );
}
