import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import type {
  ListWishListsResponse,
  UpdateWishListRequest,
  WishList,
} from "../../types";
import * as yup from "yup";
import { updateWishList } from "../../api/endpoints";

// TODO: Define the wish list visibility options in a reusable location.
const visibilityOptions = [
  { value: "public", label: "Public" },
  { value: "friends_only", label: "Friends Only" },
  { value: "private", label: "Private" },
];

const validationSchema = yup.object({
  name: yup
    .string()
    .max(100, "The name should not exceed 100 characters.")
    .required("The name is required."),
});

interface EditWishListFormProps {
  open: boolean;
  handleClose: () => void;
  username: string | undefined;
  wishList: WishList | null;
}

export default function EditWishListForm(props: EditWishListFormProps) {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: props.wishList?.name ?? "",
      visibility: props.wishList?.visibility ?? "private",
      apiErrorMessage: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const username = props.username ?? "";
      const wishListId = props.wishList?.id ?? 0;
      const request: UpdateWishListRequest = {
        name: values.name,
        visibility: values.visibility,
      };

      const { data, error } = await updateWishList(
        username,
        wishListId,
        request,
      );

      if (error) {
        formik.setFieldValue("apiErrorMessage", error.message);
        return;
      }

      if (data?.wishList) {
        queryClient.setQueryData(
          // TODO: Store the query key for reusability instead of hardcoding it.
          ["listWishListsResponse", props.username],
          (prevState: ListWishListsResponse) => ({
            wishLists: prevState.wishLists.map((wishList) =>
              wishList.id === data.wishList.id ? data.wishList : wishList,
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
      <DialogTitle>Edit Wish List</DialogTitle>
      <DialogContent>
        <form id="edit-wish-list-form" onSubmit={formik.handleSubmit}>
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
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            select
            fullWidth
            id="visibility"
            name="visibility"
            label="Visibility"
            margin="normal"
            value={formik.values.visibility}
            onChange={formik.handleChange}
          >
            {visibilityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          form="edit-wish-list-form"
          loading={formik.isSubmitting}
          loadingPosition="end"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
