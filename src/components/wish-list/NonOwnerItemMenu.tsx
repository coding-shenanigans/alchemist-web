import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";
import type { Item } from "../../types";

interface NonOwnerItemMenuProps {
  anchorEl: HTMLButtonElement | null;
  isLoading: boolean;
  selectedItem: Item | undefined;
  username: string;
  handleCloseMenu: () => void;
  handleReserve: () => Promise<void>;
  handleCancelReservation: () => Promise<void>;
}

export default function NonOwnerItemMenu(props: NonOwnerItemMenuProps) {
  const getOptions = () => {
    if (props.selectedItem?.status === "available") {
      return (
        <MenuItem onClick={props.handleReserve}>
          <ListItemIcon>
            <RedeemIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reserve</ListItemText>
          {props.isLoading && (
            <CircularProgress
              size="1.25rem"
              aria-label="Updating item status..."
              sx={{ ml: 1.5 }}
            />
          )}
        </MenuItem>
      );
    } else if (
      props.selectedItem?.status === "reserved" &&
      props.selectedItem?.reservedByUsername === props.username
    ) {
      return (
        <MenuItem onClick={props.handleCancelReservation}>
          <ListItemIcon>
            <RedeemIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cancel Reservation</ListItemText>
          {props.isLoading && (
            <CircularProgress
              size="1.25rem"
              aria-label="Updating item status..."
              sx={{ ml: 1.5 }}
            />
          )}
        </MenuItem>
      );
    } else {
      return (
        <MenuItem disabled>
          <ListItemIcon>
            <RedeemIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reserve</ListItemText>
        </MenuItem>
      );
    }
  };

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      onClose={props.handleCloseMenu}
    >
      {getOptions()}
    </Menu>
  );
}
