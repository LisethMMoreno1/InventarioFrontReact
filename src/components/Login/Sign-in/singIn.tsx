import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { postLogin } from "../../../services/api/loginService/singInService";
import { loginSchema } from "../../../types/Login/SignInSchemas";

const SignIn: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      identificationNumber: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        const response = await postLogin(values);
        console.log("Login successful:", response);
      } catch (error) {
        console.error("Login failed:", error);
        setError("Nombre de usuario o contraseña inválidos");
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Accede a tu cuenta
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            type="text"
            id="identificationNumber"
            name="identificationNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.identificationNumber}
            margin="normal"
            required
            fullWidth
            label="Identification Number"
            autoComplete="identificationNumber"
            autoFocus
          />
          {formik.touched.identificationNumber &&
            formik.errors.identificationNumber ? (
            <Typography variant="body2" color="error">
              {formik.errors.identificationNumber}
            </Typography>
          ) : null}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Typography variant="body2" color="error">
              {formik.errors.password}
            </Typography>
          ) : null}
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink href="#" underline="hover">
                <Typography variant="body2" color="primary">
                  Forgot your password?
                </Typography>
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;


