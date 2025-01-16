import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { postCustomers } from "../../services/api/CustomersServices/customersService";
import { customersSchema } from "../../types/Customers/customers";
import { showErrorAlert, showSuccessAlert } from "../../Utils/alert";
import GeneralDashboard from "../componentesGenerales/GeneralDashboard/GeneralDashboard";
import AppRouter from "../../routes/AppRouter";

const CustomerForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      id: 0,
      typeOfIdentification: "",
      identificationNumber: "",
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    validationSchema: customersSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await postCustomers(values);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        showSuccessAlert("Cliente registrado exitosamente");
        resetForm();
      } catch (error) {
        console.error("Error capturado", error);
        showErrorAlert(`Error: ${error}`);
      }
    },
  });

  return (
    <GeneralDashboard title="Registrar Cliente" routes={AppRouter}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="typeOfIdentification"
              name="typeOfIdentification"
              label="Tipo de Identificación"
              value={formik.values.typeOfIdentification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.typeOfIdentification &&
                Boolean(formik.errors.typeOfIdentification)
              }
              helperText={
                formik.touched.typeOfIdentification &&
                formik.errors.typeOfIdentification
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="identificationNumber"
              name="identificationNumber"
              label="Número de Identificación"
              value={formik.values.identificationNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.identificationNumber &&
                Boolean(formik.errors.identificationNumber)
              }
              helperText={
                formik.touched.identificationNumber &&
                formik.errors.identificationNumber
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Nombre del Cliente"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Teléfono"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Correo Electrónico"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Dirección"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Registrar
          </Button>
        </Box>
      </form>
    </GeneralDashboard>
  );
};

export default CustomerForm;
