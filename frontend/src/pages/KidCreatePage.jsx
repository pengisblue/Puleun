import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import KidProfileImage from "../components/Kids/KidProfileImage";
import defaultImg from "../asset/no_profile_img.png";

export default function KidCreatePage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [preview, setPreview] = useState(defaultImg);
  const [inputImg, setInputImg] = useState(null);
  const [nickname, setNickname] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [birthDate, setBirthDate] = useState(today);
  const [gender, setGender] = useState(null);

  const [selectedGender, setSelectedGender] = useState("M");

  const handleInputImg = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      setInputImg(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log(inputImg);
  };

  const handleNickname = (event) => {
    setNickname(event.target.value);
    console.log(nickname);
  };

  const handleBirthDate = (event) => {
    setBirthDate(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("birth_DT", birthDate);
    formData.append("gender", selectedGender);
    formData.append("parent_id", userInfo.userId);
    formData.append("profile_img", inputImg);

    axios({
      method: "post",
      url: `https://i10e101.p.ssafy.io/v1/user/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        console.log(res);
        navigate("/kids");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="px-6">
      <h1 className="mx-2 my-4 text-title">아이 추가</h1>

      <div className="mb-12 mt-6 flex flex-col gap-4">
        <div className="grid grid-flow-row-dense grid-cols-8 gap-2">
          <div className="col-span-3">
            <KidProfileImage imgUrl={preview} />
          </div>
          <div className="col-span-5">
            <section className="mb-3">
              <label htmlFor="">아이 애칭</label>
              <br></br>
              <Input
                type="text"
                onChange={handleNickname}
                className="w-full"
                required
              />
            </section>
            <section className="mb-3">
              <span>생년월일</span>
              <br></br>
              <Input
                type="date"
                value={birthDate}
                onChange={handleBirthDate}
                className="block"
                required
              />
            </section>
            <section className="mb-3">
              <RadioGroup
                value={selectedGender}
                onChange={setSelectedGender}
                name="gender"
              >
                <RadioGroup.Label>성별</RadioGroup.Label>
                <div className="flex gap-3">
                  <RadioGroup.Option
                    value="M"
                    className={({ checked }) =>
                      `${
                        checked
                          ? "bg-blue-400 text-white ring ring-blue-400 ring-opacity-50 ring-offset-1"
                          : "bg-blue-200 text-slate-800"
                      } mt-2 rounded-lg px-3 py-1.5 font-semibold`
                    }
                  >
                    남자
                  </RadioGroup.Option>
                  <RadioGroup.Option
                    value="F"
                    className={({ checked }) =>
                      `${
                        checked
                          ? "bg-red-400 text-white ring ring-red-400 ring-opacity-50 ring-offset-1"
                          : "bg-red-200 text-slate-800"
                      } mt-2 rounded-lg px-3 py-1.5 font-semibold`
                    }
                  >
                    여자
                  </RadioGroup.Option>
                </div>
              </RadioGroup>
            </section>
            <section>
              <span>프로필 변경</span>
              <input
                type="file"
                accept=".png, .jpg"
                onChange={handleInputImg}
                className="col-span-8 mt-2 w-full"
              />
            </section>
            <div className="mt-5 grid place-content-center">
              <Button
                isDisabled={false}
                onClick={handleCreate}
                className="w-40 bg-amber-300 text-white hover:bg-amber-400"
              >
                등록하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
