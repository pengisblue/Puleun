import { useState } from "react";
import axios from "axios";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import KidProfileImage from "../components/Kids/KidProfileImage";
import defaultImg from "../asset/no_profile_img.png";
import { useNavigate } from "react-router-dom";

export default function KidCreatePage() {
  const [preview, setPreview] = useState(defaultImg);
  const [inputImg, setInputImg] = useState(null);
  const [nickname, setNickname] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [birthDate, setBirthDate] = useState(today);
  const [gender, setGender] = useState(null);
  const navigate = useNavigate();

  const handleInputImg = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        setInputImg(reader.result);
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
    console.log(localStorage.getItem("userInfo").userId);

    try {
      const response = await axios.post(
        "https://i10e101.p.ssafy.io/v1/user/child",
        {
          nickname: nickname,
          birth_DT: birthDate,
          gender: gender,
          parent_id: JSON.parse(localStorage.getItem("userInfo")).userId,
        },
      );

      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      navigate("/kids");
    }
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
              <span>성별</span>
              <br></br>
              <button
                className="mt-2 rounded bg-blue-200 px-2 py-1 font-semibold text-slate-800"
                value="M"
                onClick={handleGender}
              >
                남자
              </button>
              &nbsp;
              <button
                className="mt-2 rounded bg-red-200 px-2 py-1 font-semibold text-slate-800"
                value="F"
                onClick={handleGender}
              >
                여자
              </button>
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
