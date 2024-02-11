
// login 페이지
// 로그인 - 이메일, pw


import { useState } from "react";
import axios from "axios";
import Button from "../components/UI/Button";
import navImg from "../asset/log.svg";

export default function Login() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(userEmail);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(useState);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userEmail, userPassword);

    // 로컬스토리지에 key, value 저장
    axios.post("https://i10e101.p.ssafy.io/v1/user-login",
      {
          user_email : userEmail,
          user_password : userPassword
      }
      )
      .then(res => {
          console.log(res.data)
          localStorage.clear()
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('token', res.data.token)
          window.location.replace('https://i10e101.p.ssafy.io')
      })
      .catch((err) => {
          console.log(err)
          // setErrorMessage(false)
      })
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={navImg}
            alt="purun"
          />
          <h1 className="mx-2 my-4 text-title">로그인</h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <section>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@google.com"
                  value={userEmail}
                  onChange={handleEmail}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-300 sm:text-sm sm:leading-6"
                />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-green-400 hover:text-green-500">
                    비밀번호 찾기
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={userPassword}
                  onChange={handlePassword}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-300 sm:text-sm sm:leading-6"
                />
              </div>
            </section>

            <section>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                로그인
              </button>
            </section>
          </form>

          <p className="mt-10 text-center text-m text-gray-500">
            서비스를 이용하고 싶으신가요?{' '}
            <a href="#" className="font-semibold leading-6 text-green-400 hover:text-green-500">
              회원가입 바로가기
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
