import { Box, CircularProgress, Typography } from "@mui/material";
import { APP_NAME } from "../constants";

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
        {APP_NAME}
      </Typography>
      <CircularProgress aria-label="Loading…" />
    </Box>
  );
}
