import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { Item } from "../../types";
import { useFormik } from "formik";

interface DeleteItemFormProps {
  open: boolean;
  handleClose: () => void;
  item: Item | null;
}

export default function DeleteItemForm(props: DeleteItemFormProps) {
  const formik = useFormik({
    initialValues: {
      apiErrorMessage: "",
    },
    onSubmit: async () => {
      console.log("Deleting item...");
    },
  });

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Delete {props.item?.name}?</DialogTitle>
      <DialogContent>
        <form id="delete-item-form" onSubmit={formik.handleSubmit}>
          {formik.values.apiErrorMessage && (
            <Alert
              variant="filled"
              severity="error"
              sx={{ mb: 1 }}
              onClose={() => {
                formik.setFieldValue("apiErrorMessage", "");
              }}
            >
              {formik.values.apiErrorMessage}
            </Alert>
          )}
          <Typography>
            This action cannot be undone. The <b>{props.item?.name}</b> item
            will be permanently deleted.
          </Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          type="submit"
          form="delete-item-form"
        >
          Delete Permanently
        </Button>
      </DialogActions>
    </Dialog>
  );
}
