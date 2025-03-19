"use client";

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import useVehicleOwnerStore from "../../store/vehicleOwner/useVehicleOwnerStore";
import { useCreateVehicleReceptionRecord } from "../../store/vehicleReceptionRecord/useCreateVehicleReceptionRecord";
import { VehicleReceptionRecordSchema } from "../../types/vehicleReceptionRecord/vehicleReceptionRecord.schema";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";

const VehicleReceptionRecordCreate = () => {
  const { isLoading, createRecord } = useCreateVehicleReceptionRecord();
  const { vehicleOwners, fetchVehicleOwners } = useVehicleOwnerStore();

  useEffect(() => {
    fetchVehicleOwners();
  }, [fetchVehicleOwners]);

  const formik = useFormik({
    initialValues: {
      arrivalDate: new Date().toISOString().split("T")[0],
      arrivalCondition: "",
      diagnosis: "",
      diagnosisCost: 0,
      repairProposals: "",
      invoiceDetails: "",
      contractSigned: false,
      advancePayment: 0,
      vehicleOwnerId: "",
    },
    validationSchema: VehicleReceptionRecordSchema,
    onSubmit: async (values) => {
      try {
        await createRecord({
          ...values,
          arrivalDate: new Date(values.arrivalDate),
          vehicleOwnerId: Number(values.vehicleOwnerId),
        });

        alert("Registro de recepción guardado con éxito");
        formik.resetForm();
      } catch (error) {
        console.error("Error al guardar el registro de recepción:", error);
        alert("Hubo un error al guardar el registro de recepción");
      }
    },
  });

  return (
    <ComponentFormInline
      title="Crear Registro de Recepción"
      onSubmit={formik.handleSubmit}
      submitLabel="Guardar Registro"
      isLoading={isLoading}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>ID del Propietario</InputLabel>
              <Select
                value={formik.values.vehicleOwnerId}
                onChange={(e) =>
                  formik.setFieldValue("vehicleOwnerId", Number(e.target.value))
                }
                error={
                  formik.touched.vehicleOwnerId &&
                  Boolean(formik.errors.vehicleOwnerId)
                }
              >
                {vehicleOwners.map((owner) => (
                  <MenuItem key={owner.id} value={owner.id}>
                    {`${owner.fullName.toUpperCase()} - ${
                      owner.identificationNumber
                    }`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha de Llegada"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...formik.getFieldProps("arrivalDate")}
              error={
                formik.touched.arrivalDate && Boolean(formik.errors.arrivalDate)
              }
              helperText={
                formik.touched.arrivalDate && formik.errors.arrivalDate
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Condición de Llegada"
              {...formik.getFieldProps("arrivalCondition")}
              error={
                formik.touched.arrivalCondition &&
                Boolean(formik.errors.arrivalCondition)
              }
              helperText={
                formik.touched.arrivalCondition &&
                formik.errors.arrivalCondition
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Diagnóstico"
              {...formik.getFieldProps("diagnosis")}
              error={
                formik.touched.diagnosis && Boolean(formik.errors.diagnosis)
              }
              helperText={formik.touched.diagnosis && formik.errors.diagnosis}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Costo del Diagnóstico"
              type="number"
              {...formik.getFieldProps("diagnosisCost")}
              error={
                formik.touched.diagnosisCost &&
                Boolean(formik.errors.diagnosisCost)
              }
              helperText={
                formik.touched.diagnosisCost && formik.errors.diagnosisCost
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Propuestas de Reparación"
              {...formik.getFieldProps("repairProposals")}
              error={
                formik.touched.repairProposals &&
                Boolean(formik.errors.repairProposals)
              }
              helperText={
                formik.touched.repairProposals && formik.errors.repairProposals
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Detalles de la Factura"
              {...formik.getFieldProps("invoiceDetails")}
              error={
                formik.touched.invoiceDetails &&
                Boolean(formik.errors.invoiceDetails)
              }
              helperText={
                formik.touched.invoiceDetails && formik.errors.invoiceDetails
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.contractSigned}
                  onChange={(e) =>
                    formik.setFieldValue("contractSigned", e.target.checked)
                  }
                />
              }
              label="Contrato Firmado"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pago Adelantado"
              type="number"
              {...formik.getFieldProps("advancePayment")}
              error={
                formik.touched.advancePayment &&
                Boolean(formik.errors.advancePayment)
              }
              helperText={
                formik.touched.advancePayment && formik.errors.advancePayment
              }
            />
          </Grid>
        </Grid>
      </Box>
    </ComponentFormInline>
  );
};

export default VehicleReceptionRecordCreate;
