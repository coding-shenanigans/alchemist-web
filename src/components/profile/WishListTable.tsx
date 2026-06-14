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
import PublicIcon from "@mui/icons-material/Public";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useState,
  type Dispatch,
  type JSX,
  type MouseEvent,
  type SetStateAction,
} from "react";

/**
 * Maps a visibility string to the corresponding icon.
 * @param visibility The visibility string.
 * @returns An icon element.
 */
const getVisibilityIcon = (visibility: string): JSX.Element => {
  if (visibility === "public") {
    return <PublicIcon />;
  } else if (visibility === "friends_only") {
    return <PeopleIcon />;
  } else if (visibility === "private") {
    return <LockIcon />;
  } else {
    return <QuestionMarkIcon />;
  }
};

interface WishListTableProps {
  wishLists: WishList[];
  setSelectedWishList: Dispatch<SetStateAction<WishList | null>>;
  handleOpenEditWishListForm: () => void;
}

export default function WishListTable(props: WishListTableProps) {
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
    handleCloseMenu();
  };

  return (
    <List disablePadding>
      {props.wishLists.map((wishList) => (
        <ListItem
          key={wishList.id}
          disablePadding
          // TODO: Only show this button when viewing your own wish lists.
          secondaryAction={
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
          }
        >
          <ListItemButton>
            <ListItemIcon>
              {getVisibilityIcon(wishList.visibility)}
            </ListItemIcon>
            <ListItemText primary={wishList.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
