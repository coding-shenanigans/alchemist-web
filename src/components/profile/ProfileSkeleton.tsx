import { Box, Skeleton } from "@mui/material";

export default function ProfileSkeleton() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        py={5}
        px={2}
        // TODO: fetch color from constants
        sx={{ backgroundColor: "#f1f3f4" }}
      >
        <Skeleton variant="circular" width={128} height={128} sx={{ mb: 1 }} />
        <Skeleton width={"100%"} sx={{ fontSize: "3rem" }} />
      </Box>
      <Box m={2}>
        <Skeleton width={"100%"} sx={{ fontSize: "4rem" }} />
        <Skeleton width={"100%"} sx={{ fontSize: "3rem" }} />
        <Skeleton width={"100%"} sx={{ fontSize: "3rem" }} />
        <Skeleton width={"100%"} sx={{ fontSize: "3rem" }} />
      </Box>
    </>
  );
}
