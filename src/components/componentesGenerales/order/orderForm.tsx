"use client";

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { SelectChangeEvent } from "@mui/material";

interface OrderFormProps {
  formData: any;
  receptionRecords: any[];
  deliveryRecords: any[];
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
  formData,
  receptionRecords,
  deliveryRecords,
  handleChange,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Registro de Recepción</InputLabel>
            <Select
              name="receptionRecordId"
              value={formData.receptionRecordId || ""}
              onChange={handleChange}
              label="Registro de Recepción"
              required
            >
              {receptionRecords.length > 0 ? (
                receptionRecords.map((record) => (
                  <MenuItem key={record.id} value={record.id}>
                    {`ID: ${record.id} - Fecha: ${new Date(
                      record.arrivalDate
                    ).toLocaleDateString()} - Propietario: ${
                      record.vehicleOwner?.fullName || "Desconocido"
                    }`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No hay registros disponibles</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Registro de Entrega</InputLabel>
            <Select
              name="deliveryRecordId"
              value={formData.deliveryRecordId || ""}
              onChange={handleChange}
              label="Registro de Entrega"
            >
              {deliveryRecords.map((record) => (
                <MenuItem key={record.id} value={record.id}>
                  {`ID: ${record.id} - Fecha: ${new Date(
                    record.deliveryDate
                  ).toLocaleDateString()}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Detalles del Trabajo"
            name="workDetails"
            value={formData.workDetails}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Costo"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderForm;
