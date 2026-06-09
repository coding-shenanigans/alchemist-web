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
import * as yup from "yup";
import type { CreateWishListRequest, ListWishListsResponse } from "../../types";
import { createWishList } from "../../api/endpoints";

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

interface NewWishListFormProps {
  open: boolean;
  handleClose: () => void;
  username: string | undefined;
}

export default function NewWishListForm(props: NewWishListFormProps) {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: { name: "", visibility: "private", apiErrorMessage: "" },
    validationSchema,
    onSubmit: async (values) => {
      const username = props.username ?? "";
      const request: CreateWishListRequest = {
        wishList: { name: values.name, visibility: values.visibility },
      };

      const { data, error } = await createWishList(username, request);

      if (error) {
        formik.setFieldValue("apiErrorMessage", error.message);
        return;
      }

      if (data?.wishList) {
        queryClient.setQueryData(
          // TODO: Store the query key for reusability instead of hardcoding it.
          ["listWishListsResponse", props.username],
          (prevState: ListWishListsResponse) => ({
            wishLists: [data.wishList, ...(prevState.wishLists ?? [])],
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
      <DialogTitle>New Wish List</DialogTitle>
      <DialogContent>
        <form id="new-wish-list-form" onSubmit={formik.handleSubmit}>
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
          form="new-wish-list-form"
          loading={formik.isSubmitting}
          loadingPosition="end"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
