import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

export default function Header() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Alchemist
          </Typography>

          <Button
            color="inherit"
            size="large"
            component={RouterLink}
            to="/signin"
            sx={{ mr: 1 }}
          >
            Sign In
          </Button>
          <Button
            color="inherit"
            size="large"
            component={RouterLink}
            to="/signup"
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
