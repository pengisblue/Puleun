import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation";

export default function RootLayout() {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="px-6 py-16">
        <Outlet />
      </main>
    </>
  );
}
