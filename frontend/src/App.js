import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/MainPage";
import PotListPage from "./pages/PotListPage";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/pots", element: <PotListPage /> },
    ],
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-amber-overlay">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
