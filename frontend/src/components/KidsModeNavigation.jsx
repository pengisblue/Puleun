import { NavLink, useParams } from "react-router-dom";

export default function KidsModeNavigation() {
  const params = useParams();

  return (
    <div className="my-4 flex gap-2 text-center">
      <NavLink
        to="" end
        className={({ isActive }) =>
          `${isActive ? "bg-emerald-500 text-white cursor-default" : "bg-green-100 text-green-400"} basis-1/2 rounded-md py-3 text-lg font-semibold`
        }
      >
        성장 중
      </NavLink>
      <NavLink
        to="collection"
        className={({ isActive }) =>
          `${isActive ? "bg-emerald-500 text-white cursor-default" : "bg-green-100 text-green-400"} basis-1/2 rounded-md py-3 text-lg font-semibold`
        }
      >
        성장 완료
      </NavLink>
    </div>
  );
}
