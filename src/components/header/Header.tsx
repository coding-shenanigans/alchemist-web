import {
  AppBar,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import PublicMenu from "./PublicMenu";
import UserMenu from "./UserMenu";
import { useAppStore } from "../../zustand/store";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useState } from "react";
import { APP_NAME } from "../../constants";

export default function Header() {
  const userSession = useAppStore((state) => state.userSession);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              color="inherit"
              underline="none"
              component={RouterLink}
              to="/"
            >
              {APP_NAME}
            </Link>
            <Chip label="Beta" color="secondary" sx={{ ml: 1 }} />
            <Tooltip title="Report a bug">
              <IconButton
                aria-label="Report a bug"
                color="inherit"
                onClick={handleOpen}
              >
                <BugReportIcon />
              </IconButton>
            </Tooltip>
          </Typography>

          {userSession ? (
            <UserMenu
              email={userSession.email}
              username={userSession.username}
            />
          ) : (
            <PublicMenu />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Report a Bug</DialogTitle>
        <DialogContent>
          Thank you for taking the time to report a bug! Please send an email to{" "}
          <b>coding.shenanigans@gmail.com</b> with the following information:
          <ul>
            <li>Subject: [{APP_NAME} Bug] Short description of the issue.</li>
            <li>
              Body: Clear steps to reproduce the issue, and screenshots if
              available.
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
