import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import MainPage from "@pages/MainPage";
import ThreadPage from "@pages/ThreadPage";
import Layout from "@pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "onboarding",
        element: <OnboardingPage />,
      },
      {
        element: <Layout />,
        children: [
          {
            path: "main",
            element: <MainPage />,
          },
          {
            path: "threads",
            element: <ThreadPage />,
          },
        ],
      },
    ],
  },
]);
