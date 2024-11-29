import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import type { CustomerCreate } from "../../interfaces/Customers/customers";
import type { typeOfIdentification } from "../../interfaces/typeOfIdentification/typeOfIdentification";
import { customersSchema } from "../../types/Customers/customers";
import { showErrorAlert, showSuccessAlert } from "../../Utils/alert";
import { Orden } from "../../interfaces/Orden/orden";
import { OrderForm } from "../Order/Order";
import { postCustomers } from "../../services/api/CustomersServices/customersService";
import { getTypeOfIdentifications } from "../../services/api/typeOfIdentificationService/typeOfIdentificationService";

const CustomerForm: React.FC = () => {
  const [typeOfIdentifications, setTypeOfIdentifications] = useState<
    typeOfIdentification[]
  >([]);

  const formik = useFormik({
    initialValues: {
      typeOfIdentification: "",
      identificationNumber: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      orderNumber: "", // Añadir campo para número de orden
      orderDate: "", // Añadir campo para fecha de orden
    },
    validationSchema: customersSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const order: Orden = {
          id: 0, // Proporciona un valor predeterminado para id
          entryDate: values.orderDate ? new Date(values.orderDate) : new Date(), // Usar la fecha actual si está vacío
          customerIdentificationNumber: values.identificationNumber,
          orderNumber: values.orderNumber,
        };

        // Crear el objeto de solicitud para el cliente
        const customersRequest: CustomerCreate = {
          id: 0,
          typeOfIdentification: values.typeOfIdentification,
          identificationNumber: values.identificationNumber,
          name: values.name,
          phone: values.phone,
          email: values.email,
          address: values.address,
          order, // Asignar el objeto de orden
        };

        const response = await postCustomers(customersRequest);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        showSuccessAlert("Cliente registrado exitosamente");
        resetForm(); // Limpiar el formulario
      } catch (error) {
        console.error("Error capturado", error); // Registro en consola para depuración
        showErrorAlert(`Error: ${error}`);
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
  }, []);

  return (
    <Container maxWidth={"lg"}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
          width: "120%",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Registro de Cliente
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="typeOfIdentification-label">
                  Tipo de Identificación
                </InputLabel>
                <Select
                  labelId="typeOfIdentification-label"
                  id="typeOfIdentification"
                  name="typeOfIdentification"
                  value={formik.values.typeOfIdentification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Seleccione...</em>
                  </MenuItem>
                  {typeOfIdentifications.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.typeOfIdentification &&
                  formik.errors.typeOfIdentification && (
                    <FormHelperText error>
                      {formik.errors.typeOfIdentification}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="identificationNumber"
                name="identificationNumber"
                label="Número de Identificación"
                value={formik.values.identificationNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.identificationNumber &&
                    formik.errors.identificationNumber
                    ? formik.errors.identificationNumber
                    : ""
                }
                error={
                  formik.touched.identificationNumber &&
                  Boolean(formik.errors.identificationNumber)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Nombre del cliente"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ""
                }
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="phone"
                name="phone"
                label="Numero de Contacto"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : ""
                }
                error={formik.touched.phone && Boolean(formik.errors.phone)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="email"
                name="email"
                label="Correo electronico"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="address"
                name="address"
                label="Direccion"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.address && formik.errors.address
                    ? formik.errors.address
                    : ""
                }
                error={formik.touched.address && Boolean(formik.errors.address)}
              />
            </Grid>
          </Grid>

          <OrderForm formik={formik} />

          <Box mt={3}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Registrar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CustomerForm;
