import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/MainPage";
import PotListPage from "./pages/PotListPage";
import RootLayout from "./pages/Root";
import KidListPage from "./pages/KidListPage";
import PotCreatePage from "./pages/PotCreatePage";
import PotDetailPage from "./pages/PotDetailPage";
import KidCreatePage from "./pages/KidCreatePage";
import KidDetailPage from "./pages/KidDetailPage";
import KidSelectPage from "./pages/KidSelectPage";
import TalkListPage from "./pages/TalkListPage";
import LandingPage from "./pages/LandingPage";

// import Example from "./test/Example";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/kids", element: <KidListPage /> },
      { path: "/pot", element: <PotListPage /> },
      { path: "/talk", element: <TalkListPage /> },
      { path: "/pot/create", element: <PotCreatePage /> },
      { path: "/kid/create", element: <KidCreatePage /> },
      { path: "/pot/:potId", element: <PotDetailPage /> },
      { path: "/kid/:userId", element: <KidDetailPage></KidDetailPage> },
      { path: "/kid/select", element: <KidSelectPage></KidSelectPage> },
    ],
  },
  {
    path: "/hello",
    element: <LandingPage />,
  },
  // 테스트용
  // {
  //   path: "/test",
  //   element: <Example />,
  // },
]);

function App() {
  return (
    <div className="min-h-screen bg-amber-overlay">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
