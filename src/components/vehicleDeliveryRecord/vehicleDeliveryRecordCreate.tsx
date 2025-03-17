"use client";

import { useState } from "react";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";

import React from "react";
import { useVehicleDeliveryStore } from "../../store/vehicleDeliveryRecord/useCreateVehicleDeliveryRecord";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";

const CreateVehicleDeliveryRecord = () => {
  const { addRecord } = useVehicleDeliveryStore();
  const [formData, setFormData] = useState({
    deliveryDate: "",
    completedRepairs: "",
    customerSatisfaction: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await addRecord({
        deliveryDate: new Date(formData.deliveryDate),
        completedRepairs: formData.completedRepairs,
        customerSatisfaction: formData.customerSatisfaction,
      });
      setFormData({
        deliveryDate: "",
        completedRepairs: "",
        customerSatisfaction: false,
      });
    } catch (error) {
      console.error("Error al guardar el registro de entrega:", error);
    }
    setIsLoading(false);
  };

  return (
    <ComponentFormInline
      title="Registrar Entrega de Vehículo"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
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
    </ComponentFormInline>
  );
};

export default CreateVehicleDeliveryRecord;
