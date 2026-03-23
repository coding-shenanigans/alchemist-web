import { Box, Link, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      // TODO: fetch color from constants
      sx={{ backgroundColor: "#f1f3f4" }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          m: 3,
          textAlign: "center",
          maxWidth: { xs: "100%", sm: 450 },
        }}
      >
        <Typography variant="h5" mb={2}>
          <Link underline="none" component={RouterLink} to="/">
            {/* TODO: fetch app name from constants */}
            Alchemist
          </Link>
        </Typography>
        <Typography variant="h6" mb={2}>
          Sign in
        </Typography>
        <SignInForm />
        <Typography mt={3}>
          Don't have an account?{" "}
          <Link underline="hover" component={RouterLink} to="/signup">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
