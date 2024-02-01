import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between text-lg font-semibold">
      <span>
        <NavLink to="/" className="mx-2" end>
          푸른
        </NavLink>
      </span>
      <ul className="me-4">
        <li>
          <NavLink
            to="/pots"
            className={({ isActive }) =>
              `${isActive ? "underline" : ""}
              mx-2`
            }
          >
            화분 목록
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
