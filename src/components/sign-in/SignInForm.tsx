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
import { signIn } from "../../api/endpoints";
import type { SignInRequest } from "../../types";
import { useNavigate } from "react-router";
import * as yup from "yup";

interface SignInFormValues {
  email: string;
  password: string;
  showPassword: boolean;
  errorMessage: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("The email address is not valid.")
    .required("An email address is required."),
  password: yup.string().required("A password is required."),
});

export default function SigninForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
      errorMessage: "",
    },
    validationSchema,
    onSubmit: async (values: SignInFormValues) => {
      const req: SignInRequest = {
        email: values.email,
        password: values.password,
      };

      const { error } = await signIn(req);

      if (error) {
        formik.setFieldValue("errorMessage", error.message);
        return;
      }

      formik.resetForm();
      navigate("/", { replace: true });
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
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        margin="normal"
        autoComplete="current-password"
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
        Sign in
      </Button>
    </form>
  );
}
