import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import type { Item, UserSession } from "../../types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router";
import {
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import StatusChip from "./StatusChip";
import OwnerItemMenu from "./OwnerItemMenu";
import NonOwnerItemMenu from "./NonOwnerItemMenu";

interface ItemsTableProps {
  userSession: UserSession | null;
  isWishListOwner: boolean;
  items: Item[];
  selectedItem?: Item;
  setSelectedItem: Dispatch<SetStateAction<Item | undefined>>;
  handleOpenEditItemForm: () => void;
  handleOpenDeleteItemForm: () => void;
  handleItemReceived: () => Promise<void>;
  handleReserveItem: () => Promise<void>;
  handleCancelItemReservation: () => Promise<void>;
}

export default function ItemsTable(props: ItemsTableProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>, item: Item) => {
    setAnchorEl(event.currentTarget);
    props.setSelectedItem(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    props.handleOpenEditItemForm();
    handleCloseMenu();
  };

  const handleDelete = () => {
    props.handleOpenDeleteItemForm();
    handleCloseMenu();
  };

  const handleReceived = async () => {
    setIsLoading(true);
    await props.handleItemReceived();
    setIsLoading(false);
    handleCloseMenu();
  };

  const handleReserve = async () => {
    setIsLoading(true);
    await props.handleReserveItem();
    setIsLoading(false);
    handleCloseMenu();
  };

  const handleCancelReservation = async () => {
    setIsLoading(true);
    await props.handleCancelItemReservation();
    setIsLoading(false);
    handleCloseMenu();
  };

  const getItemMenu = () => {
    if (props.isWishListOwner) {
      return (
        <OwnerItemMenu
          anchorEl={anchorEl}
          isLoading={isLoading}
          handleCloseMenu={handleCloseMenu}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleReceived={handleReceived}
        />
      );
    } else if (props.userSession) {
      return (
        <NonOwnerItemMenu
          anchorEl={anchorEl}
          isLoading={isLoading}
          selectedItem={props.selectedItem}
          username={props.userSession.username}
          handleCloseMenu={handleCloseMenu}
          handleReserve={handleReserve}
          handleCancelReservation={handleCancelReservation}
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <List disablePadding>
      {props.items.map((item) => {
        if (item.status === "received") {
          return undefined;
        }

        return (
          <ListItem
            key={item.id}
            disablePadding
            secondaryAction={
              props.userSession ? (
                <>
                  <IconButton
                    edge="end"
                    aria-label="item options"
                    onClick={(event) => handleOpenMenu(event, item)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  {/* TODO: Passing the `item` into this function doesn't 
                  work (we always see options for the last item), but using
                  the props.selectedItem does. Why is that? */}
                  {getItemMenu()}
                </>
              ) : undefined
            }
          >
            <ListItemButton
              component={RouterLink}
              to={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText>
                <span style={{ marginRight: "1rem" }}>{item.name}</span>
                <StatusChip
                  isWishListOwner={props.isWishListOwner}
                  status={item.status}
                  username={item.reservedByUsername}
                />
                {/* TODO: Format the price to always show 2 decimal places. */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                >{`$${item.price}`}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
