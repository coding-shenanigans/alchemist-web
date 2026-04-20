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
import {
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router";
import { signOut } from "../../api/endpoints";

interface UserMenuProps {
  email: string;
  username: string;
}

export default function UserMenu(props: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    signOut();
    navigate("/signin", { replace: true });
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
        <MenuItem onClick={handleClose} component={RouterLink} to="/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>
    </>
  );
}
