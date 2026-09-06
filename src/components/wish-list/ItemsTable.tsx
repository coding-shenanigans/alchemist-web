import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import type { Item } from "../../types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RedeemIcon from "@mui/icons-material/Redeem";
import {
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import StatusChip from "./StatusChip";

interface ItemsTableProps {
  isWishListOwner: boolean;
  items: Item[];
  setSelectedItem: Dispatch<SetStateAction<Item | undefined>>;
  handleOpenEditItemForm: () => void;
  handleOpenDeleteItemForm: () => void;
  handleItemReceived: () => Promise<void>;
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
              props.isWishListOwner ? (
                <>
                  <IconButton
                    edge="end"
                    aria-label="item options"
                    onClick={(event) => handleOpenMenu(event, item)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={handleEdit}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleReceived}>
                      <ListItemIcon>
                        <RedeemIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Received</ListItemText>
                      {isLoading && (
                        <CircularProgress
                          size="1.25rem"
                          aria-label="Updating item status..."
                          sx={{ ml: 1.5 }}
                        />
                      )}
                    </MenuItem>
                  </Menu>
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
