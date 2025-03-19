"use client";

import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";

interface VehicleDeliveryFormProps {
  formData: {
    deliveryDate: string;
    completedRepairs: string;
    customerSatisfaction: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VehicleDeliveryRecordForm: React.FC<VehicleDeliveryFormProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <TextField
        label="Fecha de Entrega"
        type="date"
        name="deliveryDate"
        value={formData.deliveryDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Reparaciones Realizadas"
        name="completedRepairs"
        value={formData.completedRepairs}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.customerSatisfaction}
            onChange={handleChange}
            name="customerSatisfaction"
          />
        }
        label="Cliente Satisfecho"
      />
    </>
  );
};

export default VehicleDeliveryRecordForm;
