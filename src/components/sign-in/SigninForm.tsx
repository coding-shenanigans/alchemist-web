import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";

interface SigninFormValues {
  email: string;
  password: string;
  showPassword: boolean;
  errorMessage: string;
}

export default function SigninForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
      errorMessage: "",
    },
    onSubmit: async (values: SigninFormValues) => {
      console.log(values);

      // TODO: Implement logic to handle a sign in request.
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
        id="email"
        name="email"
        label="Email"
        margin="normal"
        autoComplete="email"
        value={formik.values.email}
        onChange={formik.handleChange}
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
                    <Visibility />
                  ) : (
                    <VisibilityOff />
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
        Sign in
      </Button>
    </form>
  );
}
