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

interface SigninFormValues {
  email: string;
  password: string;
  showPassword: boolean;
  errorMessage: string;
}

export default function SigninForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
      errorMessage: "",
    },
    onSubmit: async (values: SigninFormValues) => {
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
