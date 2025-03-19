"use client";

import {
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { vehicleOwnerSchema } from "../../types/vehicleOwner/vehicleOwner.schema";

const VehicleOwnerForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      identificationNumber: "",
      phoneNumber: "",
      email: "",
      address: "",
      vehicleBrand: "",
      vehicleModel: "",
      licensePlate: "",
      vehicleColor: "",
      insuranceValid: false,
      specialInstructions: "",
      authorizedForPickup: false,
    },
    validationSchema: vehicleOwnerSchema,
    onSubmit: (values) => {
      console.log("Datos enviados:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid container spacing={2}>
          {/* Nombre Completo */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre Completo"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>

          {/* Número de Identificación */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Número de Identificación"
              name="identificationNumber"
              type="number"
              value={formik.values.identificationNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
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

          {/* Teléfono */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </Grid>

          {/* Correo Electrónico */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo Electrónico"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          {/* Marca del Vehículo */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Marca del Vehículo"
              name="vehicleBrand"
              value={formik.values.vehicleBrand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={
                formik.touched.vehicleBrand &&
                Boolean(formik.errors.vehicleBrand)
              }
              helperText={
                formik.touched.vehicleBrand && formik.errors.vehicleBrand
              }
            />
          </Grid>

          {/* Modelo del Vehículo */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Modelo del Vehículo"
              name="vehicleModel"
              value={formik.values.vehicleModel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={
                formik.touched.vehicleModel &&
                Boolean(formik.errors.vehicleModel)
              }
              helperText={
                formik.touched.vehicleModel && formik.errors.vehicleModel
              }
            />
          </Grid>

          {/* Placa del Vehículo */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Placa del Vehículo"
              name="licensePlate"
              value={formik.values.licensePlate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={
                formik.touched.licensePlate &&
                Boolean(formik.errors.licensePlate)
              }
              helperText={
                formik.touched.licensePlate && formik.errors.licensePlate
              }
            />
          </Grid>

          {/* Color del Vehículo */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Color del Vehículo"
              name="vehicleColor"
              value={formik.values.vehicleColor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              error={
                formik.touched.vehicleColor &&
                Boolean(formik.errors.vehicleColor)
              }
              helperText={
                formik.touched.vehicleColor && formik.errors.vehicleColor
              }
            />
          </Grid>

          {/* Instrucciones Especiales */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Instrucciones Especiales"
              name="specialInstructions"
              value={formik.values.specialInstructions}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>

          {/* Seguro Vigente */}
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="insuranceValid"
                  checked={formik.values.insuranceValid}
                  onChange={formik.handleChange}
                />
              }
              label="Seguro Vigente"
            />
          </Grid>

          {/* Autorizado para Retiro */}
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  name="authorizedForPickup"
                  checked={formik.values.authorizedForPickup}
                  onChange={formik.handleChange}
                />
              }
              label="Autorizado para Retiro"
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default VehicleOwnerForm;
