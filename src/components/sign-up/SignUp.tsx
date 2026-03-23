import { Box, Link, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
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
          Sign up
        </Typography>
        <SignUpForm />
        <Typography mt={3}>
          Already have an account?{" "}
          <Link underline="none" component={RouterLink} to="/signin">
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
