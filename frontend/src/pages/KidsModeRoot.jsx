import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation";

export default function KidsModeRootLayout() {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="px-6 py-20">
        <Outlet />
      </main>
    </>
  );
}
