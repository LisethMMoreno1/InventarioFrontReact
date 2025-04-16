import React, { useState } from "react";
import { useVehicleExitRecordStore } from "../../store/vehicleExitRecord/userVehicleExitRecord";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";
import VehicleExitRecordForm from "./vehicleExitRecordForm";

const CreateVehicleExitRecord = () => {
  const { addRecord } = useVehicleExitRecordStore();

  const [formData, setFormData] = useState({
    identificationNumber_vehicleOwner: "",
    orderNumber_order: "",
    licensePlate: "",
    exitDateTime: "",
    exitDescription: "",
    ownerSignature: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Cambio en el formulario:", { name, value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          ownerSignature: reader.result as string,
        }));
        console.log("Imagen cargada:", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!formData.identificationNumber_vehicleOwner || !formData.licensePlate) {
      alert("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const dataToSave = {
        ...formData,
        exitDateTime: new Date(formData.exitDateTime).toISOString(),
        identificationNumber_vehicleOwner: Number(
          formData.identificationNumber_vehicleOwner
        ), // Convert to number
      };

      console.log("Datos a guardar:", dataToSave);

      console.log("Registro guardado correctamente");

      // Reiniciar el formulario
      setFormData({
        identificationNumber_vehicleOwner: "",
        orderNumber_order: "",
        licensePlate: "",
        exitDateTime: "",
        exitDescription: "",
        ownerSignature: "",
      });
    } catch (error) {
      console.error("Error al guardar el registro de salida:", error);
      alert("Error al guardar el registro. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ComponentFormInline
      title="Registrar Salida de Vehículo"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <VehicleExitRecordForm formData={formData} handleChange={handleChange} />

      <div>
        <label htmlFor="ownerSignature">Firma del Propietario:</label>
        <input
          type="file"
          id="ownerSignature"
          name="ownerSignature"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {formData.ownerSignature && (
        <div>
          <p>Firma del propietario:</p>
          <img
            src={formData.ownerSignature}
            alt="Firma del propietario"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
      )}
    </ComponentFormInline>
  );
};

export default CreateVehicleExitRecord;
