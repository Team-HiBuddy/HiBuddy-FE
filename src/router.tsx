import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import MainPage from "@pages/MainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
    ],
  },
]);
