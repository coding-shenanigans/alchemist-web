import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import AppLayout from "./components/AppLayout";
import SignIn from "./components/header/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Home from "./components/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
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
