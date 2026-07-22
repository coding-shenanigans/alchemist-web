import PublicIcon from "@mui/icons-material/Public";
import PeopleIcon from "@mui/icons-material/People";
import LockIcon from "@mui/icons-material/Lock";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

interface VisibilityIconProps {
  visibility: string;
  size?: "inherit" | "small" | "medium" | "large";
}

/** Displays an apropriate visibility icon for the given visibility string. */
export default function VisibilityIcon({
  visibility,
  size = "medium",
}: VisibilityIconProps) {
  switch (visibility) {
    case "public":
      return <PublicIcon fontSize={size} />;
    case "friends_only":
      return <PeopleIcon fontSize={size} />;
    case "private":
      return <LockIcon fontSize={size} />;
    default:
      return <QuestionMarkIcon fontSize={size} />;
  }
}
