import { Outlet } from "react-router-dom";

import Navigation from "../components/Navigation";

export default function RootLayout() {
  return (
    <>
      <header className="fixed top-0 z-20 flex h-14 w-screen items-center bg-green-200 px-4">
        <Navigation />
      </header>
      
      <main className="px-6 py-16">
        <Outlet />
      </main>
    </>
  );
}
