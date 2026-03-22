import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import PublicMenu from "./PublicMenu";
import UserMenu from "./UserMenu";
import { useAppStore } from "../../zustand/store";

export default function Header() {
  const userSession = useAppStore((state) => state.userSession);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              color="inherit"
              underline="none"
              component={RouterLink}
              to="/"
            >
              {/* TODO: fetch app name from constants */}
              Alchemist
            </Link>
          </Typography>

          {userSession ? (
            <UserMenu
              email={userSession.email}
              username={userSession.username}
            />
          ) : (
            <PublicMenu />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
