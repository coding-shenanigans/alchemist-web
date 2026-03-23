import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
  errorMessage: string;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .matches(
      /^\w+$/,
      "The username can only contain alphanumeric characters and underscores.",
    )
    .min(3, "The username should have at least 3 characters.")
    .max(36, "The username should not exceed 36 characters.")
    .required("A username is required."),
  email: yup
    .string()
    .email("The email address is not valid.")
    .max(254, "The email address should not exceed 254 characters.")
    .required("An email address is required."),
  password: yup
    .string()
    .matches(
      /[a-z]{1}/,
      "The password should contain at least 1 lowercase letter.",
    )
    .matches(
      /[A-Z]{1}/,
      "The password should contain at least 1 uppercase letter.",
    )
    .matches(/[\d]{1}/, "The password should contain at least 1 number.")
    .matches(
      /[^a-zA-Z0-9]{1}/,
      "The password should contain at least 1 special character.",
    )
    .min(8, "The password should have at least 8 characters.")
    .max(72, "The password should not exceed 72 characters.")
    .required("A password is required."),
});

export default function SignUpForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      showPassword: false,
      errorMessage: "",
    },
    validationSchema,
    onSubmit: async (values: SignUpFormValues) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.errorMessage && (
        <Alert
          variant="filled"
          severity="error"
          sx={{ mb: 1 }}
          onClose={() => {
            formik.setFieldValue("errorMessage", "");
          }}
        >
          {formik.values.errorMessage}
        </Alert>
      )}
      <TextField
        autoFocus
        fullWidth
        id="username"
        name="username"
        label="Username"
        margin="normal"
        autoComplete="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && !!formik.errors.username}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        margin="normal"
        autoComplete="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        margin="normal"
        autoComplete="new-password"
        type={formik.values.showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    formik.setFieldValue(
                      "showPassword",
                      !formik.values.showPassword,
                    )
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {formik.values.showPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        size="large"
        type="submit"
        loading={formik.isSubmitting}
        loadingPosition="end"
        sx={{ mt: 3 }}
      >
        Sign up
      </Button>
    </form>
  );
}
