import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/MainPage";
import PotListPage from "./pages/PotListPage";
import RootLayout from "./pages/Root";
import KidListPage from "./pages/KidListPage";
import PotCreatePage from "./pages/PotCreatePage";

// import Example from "./test/Example";
import CreateKid from "./pages/CreateKid";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/kids", element: <KidListPage /> },
      { path: "/pot", element: <PotListPage /> },
      { path: "/pot/create", element: <PotCreatePage /> },
      { path: "/kid/create", element: <CreateKid /> },
    ],
  },
  // 테스트용
  {
    // path: "/test",
    // element: <Example />,
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-amber-overlay">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
