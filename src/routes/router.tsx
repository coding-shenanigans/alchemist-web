import { createBrowserRouter } from "react-router";
import RootLayout from "../components/RootLayout";
import AppLayout from "../components/AppLayout";
import SignIn from "../components/sign-in/SignIn";
import SignUp from "../components/sign-up/SignUp";
import Home from "../components/home/Home";
import NotFound from "../components/NotFound";
import Profile from "../components/profile/Profile";
import { userSessionLoader } from "./user-session-loader";
import SplashScreen from "../components/SplashScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: userSessionLoader,
    hydrateFallbackElement: <SplashScreen />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
