import { createBrowserRouter } from "react-router";
import RootLayout from "../components/RootLayout";
import AppLayout from "../components/AppLayout";
import SignIn from "../components/sign-in/SignIn";
import SignUp from "../components/sign-up/SignUp";
import Home from "../components/home/Home";
import ErrorPage from "../components/error/ErrorPage";
import Profile from "../components/profile/Profile";
import { userSessionLoader } from "./user-session-loader";
import SplashScreen from "../components/SplashScreen";
import WishList from "../components/wish-list/WishList";

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
            path: "/users/:username",
            element: <Profile />,
          },
          {
            path: "/users/:username/wish-lists/:wishListId",
            element: <WishList />,
          },
          {
            path: "*",
            element: (
              <ErrorPage
                message="We can't find the page you're looking for."
                code="404"
              />
            ),
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
