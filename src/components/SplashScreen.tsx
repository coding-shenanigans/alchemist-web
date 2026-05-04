import { Box, CircularProgress, Typography } from "@mui/material";

export default function SplashScreen() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
      // TODO: fetch color from constants
      sx={{ backgroundColor: "#f1f3f4" }}
    >
      <Typography variant="h3" mb={2}>
        Alchemist
      </Typography>
      <CircularProgress aria-label="Loading…" />
    </Box>
  );
}
