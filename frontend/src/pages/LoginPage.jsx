import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import axios from "axios";
import Button from "../components/UI/Button";
import navImg from "../asset/log.svg";

export default function Login() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-12">
        <div className="">
          <img className="mx-auto h-10 w-auto" src={navImg} alt="purun" />
          <h1 className="mx-2 my-4 text-title">로그인</h1>
        </div>

        <div className="mt-10 ">
          <Form method="post" className="space-y-6">
            <section>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@google.com"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-300 sm:text-sm sm:leading-6"
                />
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  비밀번호
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
          </Form>

          <p className="text-m mt-10 text-center text-gray-500">
            서비스를 이용하고 싶으신가요?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-green-400 hover:text-green-500"
            >
              회원가입 바로가기
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

// login action
export async function action({ request }) {
  const data = await request.formData();

  const loginData = {
    user_email: data.get("email"),
    user_password: data.get("password"),
  };

  try {
    const res = await axios({
      method: "post",
      url: "https://i10e101.p.ssafy.io/v1/user-login",
      data: loginData,
    });

    const { user_id, user_email, profile_img_url } = res.data;

    const userInfo = {
      userId: user_id,
      userEmail: user_email,
      userImgUrl: profile_img_url,
    };

    localStorage.clear();
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    return redirect("/");
  } catch (err) {
    console.log(err);
  }
}
