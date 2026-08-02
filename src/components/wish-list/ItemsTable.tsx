import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { Item } from "../../types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router";

interface ItemsTableProps {
  isWishListOwner: boolean;
  items: Item[];
}

export default function ItemsTable(props: ItemsTableProps) {
  return (
    <List disablePadding>
      {props.items.map((item) => (
        <ListItem
          key={item.id}
          disablePadding
          secondaryAction={
            props.isWishListOwner ? (
              <>
                <IconButton edge="end" aria-label="item options">
                  <MoreVertIcon />
                </IconButton>
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
            {/* TODO: Format the price to always show 2 decimal places. */}
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
