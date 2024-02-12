import { Form, NavLink, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/UI/Button";
import logImg from "../asset/log.svg";
import Input from "../components/UI/Input";

export default function Login() {
  const navigate = useNavigate();

  const goLanding = () => {
    navigate("/hello");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-12">
        <div className="">
          <img
            onClick={goLanding}
            className="mx-auto h-10 w-auto"
            src={logImg}
            alt="purun"
          />
          <h1 className="mx-2 my-4 text-title">로그인</h1>
        </div>

        <div className="mt-10 ">
          <Form method="post">
            <div className="space-y-6">
              <section>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  이메일
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="email@google.com"
                    required
                    className="block w-full placeholder:text-gray-400 focus:ring-green-400 "
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
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full focus:ring-green-400"
                  />
                </div>
              </section>
            </div>

            <Button className="mt-10 w-full bg-green-300 text-white shadow-sm hover:bg-green-400">
              로그인
            </Button>
          </Form>

          <p className="text-m mt-6 text-center text-gray-500">
            서비스를 이용하고 싶으신가요?{" "}
            <NavLink
              to="/signup"
              className="font-semibold leading-6 text-green-400 hover:text-green-500 
                focus-visible:outline-offset-2 focus-visible:outline-gray-300"
            >
              회원가입 바로가기
            </NavLink>
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
