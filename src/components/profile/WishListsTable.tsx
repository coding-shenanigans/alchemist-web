import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import type { WishList } from "../../types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useState,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
} from "react";
import { Link as RouterLink } from "react-router";
import VisibilityIcon from "../shared/VisibilityIcon";

interface WishListsTableProps {
  // TODO: Find the best way to handle a potentially undefined string value.
  username?: string;
  isProfileOwner: boolean;
  wishLists: WishList[];
  setSelectedWishList: Dispatch<SetStateAction<WishList | null>>;
  handleOpenEditWishListForm: () => void;
  handleOpenDeleteWishListForm: () => void;
}

export default function WishListsTable(props: WishListsTableProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (
    event: MouseEvent<HTMLButtonElement>,
    wishList: WishList,
  ) => {
    setAnchorEl(event.currentTarget);
    props.setSelectedWishList(wishList);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    props.handleOpenEditWishListForm();
    handleCloseMenu();
  };

  const handleDelete = () => {
    props.handleOpenDeleteWishListForm();
    handleCloseMenu();
  };

  return (
    <List disablePadding>
      {props.wishLists.map((wishList) => (
        <ListItem
          key={wishList.id}
          disablePadding
          secondaryAction={
            props.isProfileOwner ? (
              <>
                <IconButton
                  edge="end"
                  aria-label="wish list options"
                  onClick={(event) => handleOpenMenu(event, wishList)}
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
                </Menu>
              </>
            ) : undefined
          }
        >
          <ListItemButton
            component={RouterLink}
            to={`/users/${props.username}/wish-lists/${wishList.id}`}
          >
            <ListItemIcon>
              <VisibilityIcon visibility={wishList.visibility} />
            </ListItemIcon>
            <ListItemText primary={wishList.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
