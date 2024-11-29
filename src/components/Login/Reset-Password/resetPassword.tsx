import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { postResetPassword } from "../../../services/api/loginService/resetPaswordService";
import { resetPaswordSchema } from "../../../types/Login/resetPaswordSchema";

const ResetPassword: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      identificationNumber: "",
    },
    validationSchema: resetPaswordSchema,
    onSubmit: async (values) => {
      setError(null);
      setSuccess(null);
      try {
        const response = await postResetPassword(values);
        setSuccess("Correo de recuperación enviado con éxito.");
        console.log("postResetPassword successful:", response);
      } catch (error) {
        console.error("Error en la recuperación de contraseña:", error);
        setError("Numero de Identificación de usuario inválidos");
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
          Recupera tu contraseña
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
            label="Número de identificación"
            autoComplete="identificationNumber"
            autoFocus
          />
          {formik.touched.identificationNumber &&
            formik.errors.identificationNumber ? (
            <Typography variant="body2" color="error">
              {formik.errors.identificationNumber}
            </Typography>
          ) : null}

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="body2" color="success">
              {success}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Recuperar contraseña
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword;
