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
import { Link as RouterLink } from "react-router";

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
  // TODO: Find the best way to handle a potentially undefined string value.
  username?: string;
  isProfileOwner: boolean;
  wishLists: WishList[];
  setSelectedWishList: Dispatch<SetStateAction<WishList | null>>;
  handleOpenEditWishListForm: () => void;
  handleOpenDeleteWishListForm: () => void;
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
              {getVisibilityIcon(wishList.visibility)}
            </ListItemIcon>
            <ListItemText primary={wishList.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
