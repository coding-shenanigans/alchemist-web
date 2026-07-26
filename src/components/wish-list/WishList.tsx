import { Box, Button, Typography } from "@mui/material";
import VisibilityIcon from "../shared/VisibilityIcon";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router";
import { useAppStore } from "../../zustand/store";
import { useState } from "react";
import ItemsTable from "./ItemsTable";
import NewItemForm from "./NewItemForm";

export default function WishList() {
  const [openNewItemForm, setOpenNewItemForm] = useState(false);
  // TODO: Replace empty list with an API call to fetch items.
  const [items] = useState([]);
  const { username } = useParams();
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
          <VisibilityIcon visibility="public" size="large" />
          <Typography variant="h4" textAlign="center" ml={1}>
            Wish List Name 1
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

        {items.length ? (
          <ItemsTable isWishListOwner={isWishListOwner} items={items} />
        ) : (
          <Typography>There are no items to display.</Typography>
        )}
      </Box>

      {/* Dialog windows. */}
      <NewItemForm
        open={openNewItemForm}
        handleClose={handleCloseNewItemForm}
      />
    </>
  );
}
