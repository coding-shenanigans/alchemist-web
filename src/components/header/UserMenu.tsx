import { useState, type MouseEvent } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

interface UserMenuProps {
  email: string;
  username: string;
}

export default function UserMenu(props: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <Avatar alt="user avatar" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          disableRipple
          sx={{ cursor: "default", "&:hover": { backgroundColor: "inherit" } }}
        >
          <Avatar alt="user avatar" sx={{ mr: 1 }} />
          <ListItemText primary={props.username} secondary={props.email} />
        </MenuItem>
        <Divider />
        {/* TODO: Implement sign out functionality. */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>
    </>
  );
}
