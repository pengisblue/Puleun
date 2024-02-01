import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/MainPage";
import PotListPage from "./pages/PotListPage";
import RootLayout from "./pages/Root";
import CreatePot from "./pages/CreatePot";

// import Example from "./test/Example";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/pot", element: <PotListPage /> },
      { path: "/pot/create", element: <CreatePot /> },
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
