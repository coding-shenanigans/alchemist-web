import { Chip } from "@mui/material";

interface StatusChipProps {
  isWishListOwner: boolean;
  status: string;
  username?: string;
}

export default function StatusChip(props: StatusChipProps) {
  if (props.isWishListOwner || props.status === "available") {
    return <Chip label="Available" color="success" />;
  }

  if (props.status === "reserved") {
    return (
      <Chip
        label={`Reserved by ${props.username}`}
        // TODO: fetch color from constants
        sx={{ backgroundColor: "#f08c00", color: "#ffffff" }}
      />
    );
  }

  if (props.status === "received") {
    return <Chip label="Received" color="default" />;
  }

  return <></>;
}
