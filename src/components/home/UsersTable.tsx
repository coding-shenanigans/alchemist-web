import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import type { UserResult } from "../../types";
import { Link as RouterLink } from "react-router";

interface UsersTableProps {
  users: UserResult[];
}

export default function UsersTable(props: UsersTableProps) {
  return (
    <List disablePadding>
      {props.users.map((user) => (
        <ListItem key={user.username} disablePadding>
          <ListItemButton component={RouterLink} to={`/users/${user.username}`}>
            <ListItemIcon>
              <Avatar alt="user avatar" />
            </ListItemIcon>
            <ListItemText primary={user.username} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
