import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import logImg from "../asset/log.svg";

export default function SignUp() {
  const navigate = useNavigate();

  const goLanding = () => {
    navigate("/hello");
  };

  // 실제 이름
  const [userName, setName] = useState(null);
  const handleName = (event) => {
    setName(event.target.value);
    console.log(userName);
  };

  // 이메일
  const [userEmail, setEmail] = useState(null);
  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(userEmail);
  };

  // 비밀번호
  const [userPassword, setPassword] = useState(null);
  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(userPassword);
  };

  // 비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState(null);
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    console.log(confirmPassword);
  };

  // 애칭
  const [nickname, setNickname] = useState(null);
  const handleNickname = (event) => {
    setNickname(event.target.value);
    console.log(nickname);
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
    console.log(event.target.value);
  };

  // 회원가입 버튼
  const handleSubmit = (event) => {
    event.preventDefault();

    if (userPassword !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }

    let postValue = {
      nickname: nickname,
      birth_DT: birthDate,
      gender: gender,
      parent_id: 0,
      user_name: userName,
      user_email: userEmail,
      user_password: userPassword,
    };

    // post 요청
    axios
      .post("https://i10e101.p.ssafy.io/v1/user-login/save", postValue)
      .then((res) => {
        console.log(postValue);
        console.log(res.data);
        window.location.replace("https://i10e101.p.ssafy.io/");
      })
      .catch((err) => {
        console.log(err);
        // setErrorMessage(false)
      });
  };

  return (
    <div className="px-8 py-12">
      <div>
        <img
          onClick={goLanding}
          className="mx-auto h-10 w-auto"
          src={logImg}
          alt="purun"
        />
        <h1 className="mx-2 my-4 text-title">회원가입</h1>
      </div>

      <div className="mb-12 mt-6 flex flex-col gap-2">
        <section className="mb-3">
          <label htmlFor="">이메일</label>
          <br></br>
          <Input
            type="email"
            onChange={handleEmail}
            className="w-full focus:ring-green-400"
            required
          />
        </section>
        <section className="mb-3">
          <label htmlFor="">비밀번호</label>
          <br></br>
          <Input
            type="password"
            onChange={handlePassword}
            className="w-full focus:ring-green-400"
            required
          />
        </section>
        <section className="mb-3">
          <label htmlFor="">비밀번호확인</label>
          <br></br>
          <Input
            type="password"
            onChange={handleConfirmPassword}
            className="w-full focus:ring-green-400"
            required
          />
        </section>
        <section className="mb-3">
          <label htmlFor="">닉네임</label>
          <br></br>
          <Input
            type="text"
            onChange={handleNickname}
            className="w-full focus:ring-green-400"
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
            className="block focus:ring-green-400"
            required
          />
        </section>
        <section className="mb-3">
          <span>성별</span>
          <br></br>
          <button
            className="mt-2 rounded bg-blue-200 px-2 py-1 font-semibold text-slate-800 focus:bg-blue-300"
            value="M"
            onClick={handleGender}
          >
            남자
          </button>
          &nbsp;
          <button
            className="mt-2 rounded bg-red-200 px-2 py-1 font-semibold text-slate-800 focus:bg-red-300"
            value="F"
            onClick={handleGender}
          >
            여자
          </button>
        </section>
        <div className="mt-10 grid place-content-center">
          <Button
            isDisabled={false}
            className="w-40 bg-green-300 text-white hover:bg-green-400"
            onClick={handleSubmit}
          >
            회원가입하기
          </Button>
        </div>
        <p className="text-m mt-6 text-center text-gray-500">
          이미 계정이 있으신가요?{" "}
          <NavLink
            to="/login"
            className="font-semibold leading-6 text-green-400 hover:text-green-500
              focus-visible:outline-offset-2 focus-visible:outline-gray-300"
          >
            로그인 바로가기
          </NavLink>
        </p>
      </div>
    </div>
  );
}
