"use client";

import React from "react";
import { useFormik } from "formik";
import { useCreateVehicleReceptionRecord } from "../../store/vehicleReceptionRecord/useCreateVehicleReceptionRecord";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";
import { Box, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { VehicleReceptionRecordSchema } from "../../types/vehicleReceptionRecord/vehicleReceptionRecord.schema";

const VehicleReceptionRecordCreate = () => {
  const { isLoading, createRecord } = useCreateVehicleReceptionRecord();

  const formik = useFormik({
    initialValues: {
      arrivalDate: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
      arrivalCondition: "",
      diagnosis: "",
      diagnosisCost: 0,
      repairProposals: "",
      invoiceDetails: "",
      contractSigned: false,
      advancePayment: 0,
    },
    validationSchema: VehicleReceptionRecordSchema,
    onSubmit: async (values) => {
      console.log("Valores antes de enviar:", values);

      try {
        await createRecord({
          ...values,
          arrivalDate: new Date(values.arrivalDate),
        });

        console.log("Registro de recepción guardado con éxito");
        alert("Registro de recepción guardado con éxito");

        // Reset the form after successful submission
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
      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          fullWidth
          label="Fecha de Llegada"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...formik.getFieldProps("arrivalDate")}
          error={
            formik.touched.arrivalDate && Boolean(formik.errors.arrivalDate)
          }
          helperText={formik.touched.arrivalDate && formik.errors.arrivalDate}
        />

        <TextField
          fullWidth
          label="Condición de Llegada"
          {...formik.getFieldProps("arrivalCondition")}
          error={
            formik.touched.arrivalCondition &&
            Boolean(formik.errors.arrivalCondition)
          }
          helperText={
            formik.touched.arrivalCondition && formik.errors.arrivalCondition
          }
        />

        <TextField
          fullWidth
          label="Diagnóstico"
          {...formik.getFieldProps("diagnosis")}
          error={formik.touched.diagnosis && Boolean(formik.errors.diagnosis)}
          helperText={formik.touched.diagnosis && formik.errors.diagnosis}
        />

        <TextField
          fullWidth
          label="Costo del Diagnóstico"
          type="number"
          {...formik.getFieldProps("diagnosisCost")}
          error={
            formik.touched.diagnosisCost && Boolean(formik.errors.diagnosisCost)
          }
          helperText={
            formik.touched.diagnosisCost && formik.errors.diagnosisCost
          }
        />

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

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.contractSigned}
              {...formik.getFieldProps("contractSigned")}
            />
          }
          label="Contrato Firmado"
        />

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
      </Box>
    </ComponentFormInline>
  );
};

export default VehicleReceptionRecordCreate;
