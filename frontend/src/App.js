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
import TalkDetailPage from "./pages/TalkDetailPage";
import LandingPage from "./pages/LandingPage";
import CollectionPage from "./pages/CollectionPage";
import KidsModeRootLayout from "./pages/KidsModeRoot";
import KidsModeDetailLayout from "./pages/KidsModeDetail";
import KidsModePot from "./pages/KidsModePot";
import KidsModeCollection from "./pages/KidsModeCollection";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import SignUpPage, { action as signUpAction } from "./pages/SignUpPage";
import MeassageListPage from "./pages/MessageListPage";
import KidsmodePage from "./pages/KidsmodePage";
import MessageCreatePage from "./pages/MessageCreatePage";

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
      { path: "/message", element: <MeassageListPage /> },
      { path: "/pot/create", element: <PotCreatePage /> },
      { path: "/kid/create", element: <KidCreatePage /> },
      { path: "/pot/:potId", element: <PotDetailPage /> },
      { path: "/kid/:userId", element: <KidDetailPage></KidDetailPage> },
      { path: "/talk/:talkId", element: <TalkDetailPage /> },
      { path: "/collection/:userId", element: <CollectionPage /> },
      { path: "/message/create", element: <MessageCreatePage></MessageCreatePage> },
    ],
  },
  {
    path: "/kidsmode",
    element: <KidsModeRootLayout />,
    children: [
      {
        index: true,
        element: <KidSelectPage />,
      },
      {
        path: "/kidsmode/:userId",
        element: <KidsModeDetailLayout />,
        children: [
          { index: true, element: <KidsModePot /> },
          {
            path: "/kidsmode/:userId/collection",
            element: <KidsModeCollection />,
          },
        ],
      },
    ],
  },
  {
    path: "/hello",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    action: signUpAction,
  },

  // 테스트용
  // {
  //   path: "/test",
  //   element: <Example />,
  // },
]);

function App() {
  return (
    <div className="mx-auto min-h-screen max-w-page bg-amber-overlay">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
