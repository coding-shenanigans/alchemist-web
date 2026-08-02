import { Box, Button, Typography } from "@mui/material";
import VisibilityIcon from "../shared/VisibilityIcon";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router";
import { useAppStore } from "../../zustand/store";
import { useState } from "react";
import ItemsTable from "./ItemsTable";
import NewItemForm from "./NewItemForm";
import { useQuery } from "@tanstack/react-query";
import { getWishListQuery, listItemsQuery } from "../../api/endpoint-wrappers";
import ErrorPage from "../error/ErrorPage";
import WishListSkeleton from "./WishListSkeleton";

export default function WishList() {
  const [openNewItemForm, setOpenNewItemForm] = useState(false);
  const { username, wishListId } = useParams();
  const userSession = useAppStore((state) => state.userSession);
  const isWishListOwner = Boolean(
    userSession &&
    username &&
    userSession.username.toLowerCase() === username.toLowerCase(),
  );

  const handleOpenNewItemForm = () => {
    setOpenNewItemForm(true);
  };

  const handleCloseNewItemForm = () => {
    setOpenNewItemForm(false);
  };

  const wishListQuery = useQuery({
    // TODO: Store the query key for reusability instead of hardcoding it.
    queryKey: ["getWishListResponse", username, wishListId],
    queryFn: () => getWishListQuery(username, wishListId),
  });

  const itemsQuery = useQuery({
    // TODO: Store the query key for reusability instead of hardcoding it.
    queryKey: ["listItemsResponse", username, wishListId],
    queryFn: () => listItemsQuery(username, wishListId),
  });

  if (wishListQuery.isLoading || itemsQuery.isLoading) {
    return <WishListSkeleton />;
  }

  if (wishListQuery.isError) {
    return <ErrorPage message={wishListQuery.error.message} />;
  }

  if (itemsQuery.isError) {
    return <ErrorPage message={itemsQuery.error.message} />;
  }

  return (
    <>
      {/* Wish list info section */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        // TODO: fetch color from constants
        sx={{ backgroundColor: "#f1f3f4" }}
        py={5}
        px={2}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <VisibilityIcon
            visibility={wishListQuery.data?.wishList.visibility ?? ""}
            size="large"
          />
          <Typography variant="h4" textAlign="center" ml={1}>
            {wishListQuery.data?.wishList.name}
          </Typography>
        </Box>
        <Typography>Owned by {username}</Typography>
      </Box>

      {/* Items section */}
      <Box display="flex" flexDirection="column" m={2}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Items
          </Typography>
          {isWishListOwner && (
            <Button
              size="large"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenNewItemForm}
            >
              Add item
            </Button>
          )}
        </Box>

        {itemsQuery.data?.items.length ? (
          <ItemsTable
            isWishListOwner={isWishListOwner}
            items={itemsQuery.data?.items}
          />
        ) : (
          <Typography>There are no items to display.</Typography>
        )}
      </Box>

      {/* Dialog windows. */}
      <NewItemForm
        open={openNewItemForm}
        handleClose={handleCloseNewItemForm}
        username={username}
        wishListId={wishListId}
      />
    </>
  );
}
