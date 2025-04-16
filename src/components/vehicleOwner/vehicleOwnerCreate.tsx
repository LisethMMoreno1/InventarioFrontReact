"use client";

import React, { useState } from "react";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";
import useVehicleOwnerStore from "../../store/vehicleOwner/useVehicleOwnerStore";
import VehicleOwnerForm from "./vehicleOwnerForms";

const CreateVehicleOwner = () => {
  const { addVehicleOwner, loading } = useVehicleOwnerStore();

  const [formData, setFormData] = useState({
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
  });

  const handleSubmit = async () => {
    console.log("Datos antes de enviar:", formData); // Verifica los datos

    if (
      !formData.fullName ||
      !formData.identificationNumber ||
      !formData.phoneNumber
    ) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    try {
      await addVehicleOwner({
        ...formData,
        identificationNumber: Number(formData.identificationNumber),
      });

      setFormData({
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
      });
    } catch (error) {
      console.error("Error al crear el propietario:", error);
    }
  };

  return (
    <ComponentFormInline
      title="Crear Propietario del Vehículo"
      onSubmit={handleSubmit}
      isLoading={loading}
    >
      <VehicleOwnerForm />
    </ComponentFormInline>
  );
};

export default CreateVehicleOwner;
