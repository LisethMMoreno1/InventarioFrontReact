"use client";

import React, { useState } from "react";
import { useVehicleDeliveryStore } from "../../store/vehicleDeliveryRecord/useCreateVehicleDeliveryRecord";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";
import VehicleDeliveryRecordForm from "./vehicleDeliveryRecordForm";

const CreateVehicleDeliveryRecord = () => {
  const { addRecord } = useVehicleDeliveryStore();
  const [formData, setFormData] = useState({
    deliveryDate: "",
    completedRepairs: "",
    customerSatisfaction: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <VehicleDeliveryRecordForm
        formData={formData}
        handleChange={handleChange}
      />
    </ComponentFormInline>
  );
};

export default CreateVehicleDeliveryRecord;
