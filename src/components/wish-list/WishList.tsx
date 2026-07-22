import { Box, Button, Typography } from "@mui/material";
import VisibilityIcon from "../shared/VisibilityIcon";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router";
import { useAppStore } from "../../zustand/store";

export default function WishList() {
  const { username } = useParams();
  const userSession = useAppStore((state) => state.userSession);
  const isWishListOwner = Boolean(
    userSession &&
    username &&
    userSession.username.toLowerCase() === username.toLowerCase(),
  );

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
            <Button size="large" variant="contained" startIcon={<AddIcon />}>
              Add item
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
