import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PublicIcon from "@mui/icons-material/Public";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";

export default function Profile() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        py={5}
        px={2}
        // TODO: fetch color from constants
        sx={{ backgroundColor: "#f1f3f4" }}
      >
        <Avatar alt="user avatar" sx={{ width: 128, height: 128 }} />
        <Typography variant="h4">username</Typography>
      </Box>
      <Box display="flex" flexDirection="column" m={2}>
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Wish Lists
          </Typography>
          <Button size="large" variant="contained" startIcon={<AddIcon />}>
            Create wish list
          </Button>
        </Box>
        <Typography>There are no wish lists to display.</Typography>
        <List>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="wish list options">
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="List 1" />
            </ListItemButton>
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="wish list options">
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="List 2" />
            </ListItemButton>
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="wish list options">
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="List 3" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
