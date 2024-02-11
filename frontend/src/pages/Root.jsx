import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation";

export default function RootLayout() {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="py-20">
        <Outlet />
      </main>
    </>
  );
}
