import { Box, Typography } from "@mui/material";

interface ErrorPageProps {
  message: string;
  code?: string;
}

export default function ErrorPage({ message, code }: ErrorPageProps) {
  return (
    <Box sx={{ p: 3, m: 3, textAlign: "center" }}>
      <Typography variant="h5">{message}</Typography>
      {code && <Typography my={2}>Error code: {code}</Typography>}
    </Box>
  );
}
