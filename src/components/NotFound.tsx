import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ p: 3, m: 3, textAlign: "center" }}>
      <Typography variant="h4">
        We can't find the page you're looking for.
      </Typography>
      <Typography my={2}>Error code: 404</Typography>
    </Box>
  );
}
