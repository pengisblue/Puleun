import { useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import KidProfileImage from "../components/Kids/KidProfileImage";
import kidImg from "../test/kid1.png";

export default function KidCreatePage() {
  // 이미지
  const [preview, setPreview] = useState(kidImg);
  const [inputImg, setInputImg] = useState(null);
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
  };

  // 애칭
  const [nickname, setNickname] = useState(null);
  const handleNickname = (event) => {
    setNickname(event.target.value);
  };

  // 생년월일
  const today = new Date().toISOString().split("T")[0];
  const [birthDate, setBirthDate] = useState(today);
  const handleBirthDate = (event) => {
    setBirthDate(event.target.value);
  };

  // 성별
  const [gender, setGender] = useState(null);
  const handleGender = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <h1 className="mx-2 my-4 text-title">아이 추가</h1>

      <div className="mb-12 mt-6 flex flex-col gap-4">
        <div className="grid grid-flow-row-dense grid-cols-8 gap-2">
          <div className="col-span-3">
            <KidProfileImage imgUrl={preview} />
          </div>
          <div className="col-span-5">
            <section class="mb-3">
              <label htmlFor="">아이 애칭</label>
              <Input
                type="text"
                onChange={handleNickname}
                extraClasses="w-full"
                isRequired={true}
              />
            </section>
            <section class="mb-3">
              <span>생년월일</span>
              <Input
                type="date"
                value={birthDate}
                onChange={handleBirthDate}
                extraClasses="block"
                isRequired={true}
              />
            </section>
            <section class="mb-3">
              <span>성별</span>
              <br></br>
              <button
                class="mt-2 rounded bg-blue-200 px-2 py-1 font-semibold text-slate-800"
                value="M"
                onClick={handleGender}
              >
                남자
              </button>
              &nbsp;
              <button
                class="mt-2 rounded bg-red-200 px-2 py-1 font-semibold text-slate-800"
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
              <Button isDisabled={false}>등록하기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
