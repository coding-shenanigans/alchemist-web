import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RedeemIcon from "@mui/icons-material/Redeem";

interface OwnerItemMenuProps {
  anchorEl: HTMLButtonElement | null;
  isLoading: boolean;
  handleCloseMenu: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  handleReceived: () => Promise<void>;
}

export default function OwnerItemMenu(props: OwnerItemMenuProps) {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      onClose={props.handleCloseMenu}
    >
      <MenuItem onClick={props.handleEdit}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem onClick={props.handleDelete}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
      <MenuItem onClick={props.handleReceived}>
        <ListItemIcon>
          <RedeemIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Received</ListItemText>
        {props.isLoading && (
          <CircularProgress
            size="1.25rem"
            aria-label="Updating item status..."
            sx={{ ml: 1.5 }}
          />
        )}
      </MenuItem>
    </Menu>
  );
}
