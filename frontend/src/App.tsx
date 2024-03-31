import { RouterProvider, createHashRouter } from "react-router-dom";
import MainLayout from "./ui/MainLayout.tsx";
import Error from "./ui/Error.tsx";
import MainPage from "./pages/MainPage.tsx";
import ClientPage from "./pages/ClientPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {
  ClientDebits,
  ClientInfo,
  ClientPayments,
  ClientServices,
} from "@/modules/Client";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/client/:id",
    element: (
      <MainLayout>
        <ClientPage />
      </MainLayout>
    ),
    children: [
      { path: "/client/:id/info", element: <ClientInfo /> },
      { path: "/client/:id/payments", element: <ClientPayments /> },
      { path: "/client/:id/services", element: <ClientServices /> },
      { path: "/client/:id/debits", element: <ClientDebits /> },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: (
      <MainLayout>
        <LoginPage />
      </MainLayout>
    ),
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
