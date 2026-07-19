import { useState } from "react";
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
import NewWishListForm from "./NewWishListForm";
import EditWishListForm from "./EditWishListForm";
import type { WishList } from "../../types";
import DeleteWishListForm from "./DeleteWishListForm";
import { useAppStore } from "../../zustand/store";

export default function Profile() {
  const [openNewWishListForm, setOpenNewWishListForm] = useState(false);
  const [openEditWishListForm, setOpenEditWishListForm] = useState(false);
  const [openDeleteWishListForm, setOpenDeleteWishListForm] = useState(false);
  const [selectedWishList, setSelectedWishList] = useState<WishList | null>(
    null,
  );
  const { username } = useParams();
  const userSession = useAppStore((state) => state.userSession);
  const isProfileOwner = Boolean(
    userSession &&
    username &&
    userSession.username.toLowerCase() === username.toLowerCase(),
  );

  const handleOpenNewWishListForm = () => {
    setOpenNewWishListForm(true);
  };

  const handleCloseNewWishListForm = () => {
    setOpenNewWishListForm(false);
  };

  const handleOpenEditWishListForm = () => {
    setOpenEditWishListForm(true);
  };

  const handleCloseEditWishListForm = () => {
    setOpenEditWishListForm(false);
  };

  const handleOpenDeleteWishListForm = () => {
    setOpenDeleteWishListForm(true);
  };

  const handleCloseDeleteWishListForm = () => {
    setOpenDeleteWishListForm(false);
  };

  const userProfileQuery = useQuery({
    // TODO: Store the query key for reusability instead of hardcoding it.
    queryKey: ["getUserProfileResponse", username],
    queryFn: () => getUserProfileQuery(username),
  });

  const wishListsQuery = useQuery({
    // TODO: Store the query key for reusability instead of hardcoding it.
    queryKey: ["listWishListsResponse", username],
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
      {/* Profile section */}
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

      {/* Wish lists section. */}
      <Box display="flex" flexDirection="column" m={2}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Wish Lists
          </Typography>
          {isProfileOwner && (
            <Button
              size="large"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenNewWishListForm}
            >
              Create wish list
            </Button>
          )}
        </Box>

        {wishListsQuery.data?.wishLists?.length ? (
          <WishListTable
            username={username}
            isProfileOwner={isProfileOwner}
            wishLists={wishListsQuery.data.wishLists}
            setSelectedWishList={setSelectedWishList}
            handleOpenEditWishListForm={handleOpenEditWishListForm}
            handleOpenDeleteWishListForm={handleOpenDeleteWishListForm}
          />
        ) : (
          <Typography>There are no wish lists to display.</Typography>
        )}
      </Box>

      {/* Dialog windows. */}
      <NewWishListForm
        open={openNewWishListForm}
        handleClose={handleCloseNewWishListForm}
        username={username}
      />
      <EditWishListForm
        open={openEditWishListForm}
        handleClose={handleCloseEditWishListForm}
        username={username}
        wishList={selectedWishList}
      />
      <DeleteWishListForm
        open={openDeleteWishListForm}
        handleClose={handleCloseDeleteWishListForm}
        username={username}
        wishList={selectedWishList}
      />
    </>
  );
}
