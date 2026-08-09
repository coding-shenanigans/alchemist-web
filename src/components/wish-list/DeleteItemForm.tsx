import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { Item, ListItemsResponse } from "../../types";
import { useFormik } from "formik";
import { deleteItem } from "../../api/endpoints";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteItemFormProps {
  open: boolean;
  handleClose: () => void;
  username: string | undefined;
  wishListId: string | undefined;
  item: Item | undefined;
}

export default function DeleteItemForm(props: DeleteItemFormProps) {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      apiErrorMessage: "",
    },
    onSubmit: async () => {
      const username = props.username ?? "";
      const wishListId = props.wishListId ?? "";
      const itemId = props.item?.id ?? 0;

      const { error } = await deleteItem(username, wishListId, itemId);

      if (error) {
        formik.setFieldValue("apiErrorMessage", error.message);
        return;
      }

      if (itemId) {
        queryClient.setQueryData(
          // TODO: Store the query key for reusability instead of hardcoding it.
          ["listItemsResponse", props.username, props.wishListId],
          (prevState: ListItemsResponse) => ({
            items: prevState.items.filter((item) => item.id !== itemId),
          }),
        );
      }

      formik.resetForm();
      props.handleClose();
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
          loading={formik.isSubmitting}
          loadingPosition="end"
        >
          Delete Permanently
        </Button>
      </DialogActions>
    </Dialog>
  );
}
