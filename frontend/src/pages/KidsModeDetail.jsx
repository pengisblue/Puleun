import { Outlet } from "react-router-dom";
import KidsModeNavigation from "../components/KidsModeNavigation";

export default function KidsModeDetailLayout() {
  return (
    <>
      <h1 className="text-title">ㅇㅇ의 화분</h1>
      <KidsModeNavigation />
      <Outlet />
    </>
  );
}
