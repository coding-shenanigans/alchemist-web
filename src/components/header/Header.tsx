import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Alchemist
          </Typography>

          <Button color="inherit" sx={{ mr: 1 }}>
            Sign In
          </Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
