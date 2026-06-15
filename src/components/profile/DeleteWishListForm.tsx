import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { ListWishListsResponse, WishList } from "../../types";
import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { deleteWishList } from "../../api/endpoints";

interface DeleteWishListFormProps {
  open: boolean;
  handleClose: () => void;
  username: string | undefined;
  wishList: WishList | null;
}

export default function DeleteWishListForm(props: DeleteWishListFormProps) {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      apiErrorMessage: "",
    },
    onSubmit: async () => {
      const username = props.username ?? "";
      const wishListId = props.wishList?.id ?? 0;

      const { error } = await deleteWishList(username, wishListId);

      if (error) {
        formik.setFieldValue("apiErrorMessage", error.message);
        return;
      }

      if (wishListId) {
        queryClient.setQueryData(
          // TODO: Store the query key for reusability instead of hardcoding it.
          ["listWishListsResponse", props.username],
          (prevState: ListWishListsResponse) => ({
            wishLists: prevState.wishLists.filter(
              (wishList) => wishList.id !== wishListId,
            ),
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
      <DialogTitle>Delete {props.wishList?.name}?</DialogTitle>
      <DialogContent>
        <form id="delete-wish-list-form" onSubmit={formik.handleSubmit}>
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
            This action cannot be undone. The <b>{props.wishList?.name}</b> wish
            list will be permanently deleted along with all of its items.
          </Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          type="submit"
          form="delete-wish-list-form"
          loading={formik.isSubmitting}
          loadingPosition="end"
        >
          Delete Permanently
        </Button>
      </DialogActions>
    </Dialog>
  );
}
