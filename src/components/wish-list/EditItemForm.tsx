import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { NumericFormat } from "react-number-format";
import * as yup from "yup";
import type { Item, ListItemsResponse, UpdateItemRequest } from "../../types";
import { updateItem } from "../../api/endpoints";
import { useQueryClient } from "@tanstack/react-query";

const validationSchema = yup.object({
  url: yup
    .string()
    .max(2048, "The URL should not exceed 2048 characters.")
    .required("The URL is required."),
  name: yup
    .string()
    .max(100, "The name should not exceed 100 characters.")
    .required("The name is required."),
  price: yup
    .number()
    .typeError("The price should be a number.")
    .min(0, "The price cannot be negative.")
    .required("The price is required."),
});

interface EditItemFormProps {
  open: boolean;
  handleClose: () => void;
  username: string | undefined;
  wishListId: string | undefined;
  item: Item | undefined;
}

export default function EditItemForm(props: EditItemFormProps) {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      url: props.item?.url ?? "",
      name: props.item?.name ?? "",
      price: props.item?.price ?? 0,
      apiErrorMessage: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      const username = props.username ?? "";
      const wishListId = props.wishListId ?? "";
      const itemId = props.item?.id ?? 0;
      const request: UpdateItemRequest = {
        url: values.url,
        name: values.name,
        price: values.price,
      };

      const { data, error } = await updateItem(
        username,
        wishListId,
        itemId,
        request,
      );

      if (error) {
        formik.setFieldValue("apiErrorMessage", error.message);
        return;
      }

      if (data?.item) {
        queryClient.setQueryData(
          // TODO: Store the query key for reusability instead of hardcoding it.
          ["listItemsResponse", props.username, props.wishListId],
          (prevState: ListItemsResponse) => ({
            items: prevState.items.map((item) =>
              item.id === data.item.id ? data.item : item,
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
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <form id="edit-item-form" onSubmit={formik.handleSubmit}>
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
            id="url"
            name="url"
            label="URL"
            margin="normal"
            value={formik.values.url}
            onChange={formik.handleChange}
            error={formik.touched.url && !!formik.errors.url}
            helperText={formik.touched.url && formik.errors.url}
          />
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
          <NumericFormat
            value={formik.values.price}
            onValueChange={(values) =>
              formik.setFieldValue("price", values.floatValue ?? "")
            }
            thousandSeparator
            decimalScale={2}
            customInput={TextField}
            fullWidth
            id="price"
            name="price"
            label="Price"
            margin="normal"
            error={formik.touched.price && !!formik.errors.price}
            helperText={formik.touched.price && formik.errors.price}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          form="edit-item-form"
          loading={formik.isSubmitting}
          loadingPosition="end"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
