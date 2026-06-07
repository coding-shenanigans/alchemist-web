import { Avatar, Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getUserProfileQuery,
  listWishListsQuery,
} from "../../api/endpoint-wrappers";
import ProfileSkeleton from "./ProfileSkeleton";
import ErrorPage from "../error/ErrorPage";
import WishListTable from "./WishListTable";

export default function Profile() {
  const { username } = useParams();

  const userProfileQuery = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => getUserProfileQuery(username),
  });

  const wishListsQuery = useQuery({
    queryKey: ["wishLists", username],
    queryFn: () => listWishListsQuery(username),
  });

  if (userProfileQuery.isLoading || wishListsQuery.isLoading) {
    return <ProfileSkeleton />;
  }

  if (userProfileQuery.isError) {
    return <ErrorPage message={userProfileQuery.error.message} />;
  }

  if (wishListsQuery.isError) {
    return <ErrorPage message={wishListsQuery.error.message} />;
  }

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
        <Avatar alt="user avatar" sx={{ width: 128, height: 128, mb: 1 }} />
        <Typography variant="h4">
          {userProfileQuery.isLoading ? "" : userProfileQuery.data?.username}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" m={2}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Wish Lists
          </Typography>
          <Button size="large" variant="contained" startIcon={<AddIcon />}>
            Create wish list
          </Button>
        </Box>

        {wishListsQuery.data?.wishLists?.length ? (
          <WishListTable wishLists={wishListsQuery.data.wishLists} />
        ) : (
          <Typography>There are no wish lists to display.</Typography>
        )}
      </Box>
    </>
  );
}
