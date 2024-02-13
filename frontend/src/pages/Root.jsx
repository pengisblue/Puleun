// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

import Navigation from "../components/Navigation";

export default function RootLayout() {
  // const navigate = useNavigate();
  
  // const isAuth = useSelector((state) => state.auth.isAuth);

  // 비로그인 상태에서 랜딩 페이지로 이동
  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/hello");
  //   }
  // }, [isAuth, navigate]);

  return (
    <div className="max-w-md">
      <header>
        <Navigation />
      </header>

      <main className="py-20">
        <Outlet />
      </main>
    </div>
  );
}
