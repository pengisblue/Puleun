import { NavLink } from "react-router-dom";

export default function KidsModeNavigation() {
  return (
    <div className="flex text-center gap-2 my-4">
      <NavLink to="" className="basis-1/2">
        성장 중
      </NavLink>
      <NavLink to="collection" className="basis-1/2">
        성장 완료
      </NavLink>
    </div>
  );
}
