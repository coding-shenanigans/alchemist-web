import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { WishList } from "../../types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PublicIcon from "@mui/icons-material/Public";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import type { JSX } from "react";

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
}

export default function WishListTable({ wishLists }: WishListTableProps) {
  return (
    <List disablePadding>
      {wishLists.map((wishList) => (
        <ListItem
          key={wishList.id}
          disablePadding
          secondaryAction={
            <IconButton edge="end" aria-label="wish list options">
              <MoreVertIcon />
            </IconButton>
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
