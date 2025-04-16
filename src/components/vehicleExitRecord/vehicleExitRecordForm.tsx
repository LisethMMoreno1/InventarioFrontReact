"use client";

import { TextField } from "@mui/material";
import React from "react";

interface VehicleExitRecordFormProps {
  formData: {
    vehicleOwner: string;
    order: string;
    licensePlate: string;
    exitDateTime: string;
    exitDescription: string;
    ownerSignature: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VehicleExitRecordForm: React.FC<VehicleExitRecordFormProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <TextField
        label="Propietario del Vehículo"
        name="vehicleOwner"
        value={formData.vehicleOwner}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Número de Orden"
        name="order"
        value={formData.order}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Matrícula del Vehículo"
        name="licensePlate"
        value={formData.licensePlate}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Fecha y Hora de Salida"
        type="datetime-local"
        name="exitDateTime"
        value={formData.exitDateTime}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Descripción de la Salida"
        name="exitDescription"
        value={formData.exitDescription}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default VehicleExitRecordForm;
