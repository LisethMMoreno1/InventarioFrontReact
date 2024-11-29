import { Button, Container, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { showErrorAlert, showSuccessAlert } from "../../../Utils/alert";
import { NewTypeOfIdentification } from "../../../interfaces/typeOfIdentification/typeOfIdentificationCreate";
import {
  getTypeOfIdentifications,
  postTypeOfIdentifications
} from "../../../services/api/typeOfIdentificationService/typeOfIdentificationService";
import typeOfIdentificationStore from "../../../stores/TypeOfIdentificationStore";
import { typeOfIdentificationsSchema } from "../../../types/Mantenimiento/typeOfIdentification/typeOfIdentification";

const TypeOfIdentification: React.FC = () => {
  const { setTypeOfIdentifications } =
    typeOfIdentificationStore((state) => ({
      typeOfIdentification: state.typeOfIdentification,
      setTypeOfIdentifications: state.setTypeOfIdentifications,
    }));

  const formik = useFormik({
    initialValues: {
      name: "",
      identifier: "",
    },
    validationSchema: typeOfIdentificationsSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const typeOfIdentificationRequest: NewTypeOfIdentification = {
          id: 0,
          name: values.name,
          identifier: values.identifier,
        };

        const response = await postTypeOfIdentifications(
          typeOfIdentificationRequest
        );
        if (response.ok) {
          showSuccessAlert("Tipo de identificación registrado exitosamente");
          resetForm();
          const updatedTypeOfIdentifications = await getTypeOfIdentifications();
          setTypeOfIdentifications(updatedTypeOfIdentifications);
        } else {
          showErrorAlert("Ya hiciste un Tipo de identificación con ese nombre");
        }
      } catch (error) {
        showErrorAlert("Error al registrar el tipo de identificación");
      }
    },
  });

  useEffect(() => {
    const fetchTypeOfIdentifications = async () => {
      try {
        const typeOfIdentificationsData = await getTypeOfIdentifications();
        setTypeOfIdentifications(typeOfIdentificationsData);
      } catch (error) {
        console.error("Error al obtener tipos de identificación:", error);
      }
    };

    fetchTypeOfIdentifications();
  }, [setTypeOfIdentifications]);


  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Creación Tipo de Identificación
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                margin="normal"
                id="name"
                name="name"
                label="Nombre de identificación"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                value={formik.values.identifier}
                onChange={formik.handleChange}
                margin="normal"
                id="identifier"
                name="identifier"
                label="Código identificador"
                error={
                  formik.touched.identifier && Boolean(formik.errors.identifier)
                }
                helperText={
                  formik.touched.identifier && formik.errors.identifier
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ marginTop: 2 }}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default TypeOfIdentification;
