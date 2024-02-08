import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation";

export default function RootLayout() {
  return (
    <div className="max-w-md">
      <header>
        <Navigation />
      </header>

      <main className="px-6 py-20">
        <Outlet />
      </main>
    </div>
  );
}
