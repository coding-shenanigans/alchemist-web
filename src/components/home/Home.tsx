import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
  type AlertColor,
  type SnackbarCloseReason,
} from "@mui/material";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import UsersTable from "./UsersTable";
import { useState } from "react";
import type { UserResult } from "../../types";
import { listUsers } from "../../api/endpoints";

export default function Home() {
  const [userResults, setUserResults] = useState<UserResult[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("error");

  const formik = useFormik({
    initialValues: { query: "" },
    onSubmit: async (values) => {
      const { error, data } = await listUsers(values.query, "");

      if (error) {
        setSnackbarMessage(error.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      setUserResults(data?.users ?? []);
    },
  });

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      {/* Search section */}
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
        <Typography variant="h4">Find Users</Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%", maxWidth: { sm: 450 } }}
        >
          <TextField
            fullWidth
            id="query"
            name="query"
            label="Search"
            margin="normal"
            value={formik.values.query}
            onChange={formik.handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => formik.handleSubmit()}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>

      {/* Users section */}
      <Box display="flex" flexDirection="column" m={2}>
        {formik.isSubmitting && (
          <Box textAlign="center">
            <CircularProgress
              aria-label="Fetching users..."
              sx={{ textAlign: "center" }}
            />
          </Box>
        )}

        {!formik.isSubmitting &&
          formik.submitCount > 0 &&
          userResults.length <= 0 && (
            <Typography>There are no users to display.</Typography>
          )}

        {!formik.isSubmitting &&
          formik.submitCount > 0 &&
          userResults.length > 0 && <UsersTable users={userResults} />}
      </Box>

      {/* TODO: Extract snackbar into the global scope, so it can be reused
      by other components. */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
