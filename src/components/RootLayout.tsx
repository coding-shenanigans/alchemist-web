import { useEffect } from "react";
import { Outlet } from "react-router";
import { APP_NAME } from "../constants";

export default function RootLayout() {
  useEffect(() => {
    document.title = APP_NAME;
  }, []);

  return <Outlet />;
}
