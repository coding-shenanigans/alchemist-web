import { Grid, Link, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import SigninForm from "./SigninForm";

export default function SignIn() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid size={{ xs: 12, sm: 8, md: 5, lg: 4, xl: 3 }}>
        <Paper elevation={3} sx={{ p: 3, m: 3, textAlign: "center" }}>
          <Typography variant="h5" mb={2}>
            <Link underline="none" component={RouterLink} to="/">
              {/* TODO: fetch app name from constants */}
              Alchemist
            </Link>
          </Typography>
          <Typography variant="h6" mb={2}>
            Sign in
          </Typography>
          <SigninForm />
          <Typography mt={3}>
            Don't have an account?{" "}
            <Link underline="hover" component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
