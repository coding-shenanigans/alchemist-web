import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router";

export default function PublicMenu() {
  return (
    <>
      <Button
        color="inherit"
        size="large"
        component={RouterLink}
        to="/signin"
        sx={{ mr: 1 }}
      >
        Sign in
      </Button>
      <Button color="inherit" size="large" component={RouterLink} to="/signup">
        Sign up
      </Button>
    </>
  );
}
