import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useOrderStore from "../../../store/order/useOrderStore";
import { Order } from "../../../types/order/order.types";
import ComponentFormInline from "../Form/componentFormInline";
import { SelectChangeEvent } from "@mui/material";

const OrderCreate = () => {
  const {
    createOrder,
    loading,
    fetchReceptionRecords,
    fetchDeliveryRecords,
    receptionRecords,
    deliveryRecords,
  } = useOrderStore();

  const [formData, setFormData] = useState<Partial<Order>>({
    orderNumber: "", // Se llenará automáticamente
    status: "Activo",
    workDetails: "",
    cost: 0,
    receptionRecordId: undefined, // Agregar esta propiedad
    deliveryRecordId: undefined, // Agregar esta propiedad
  });

  // Obtener el número de orden y los registros al cargar el componente
  useEffect(() => {
    fetchReceptionRecords();
    fetchDeliveryRecords();
  }, [fetchReceptionRecords, fetchDeliveryRecords]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { orderNumber, ...dataToSend } = formData; // Excluir orderNumber
    dataToSend.cost = Number(dataToSend.cost); // Convertir cost a número

    await createOrder(dataToSend);

    setFormData({
      status: "Activo",
      workDetails: "",
      cost: 0,
      receptionRecordId: undefined,
      deliveryRecordId: undefined,
    });
  };

  return (
    <ComponentFormInline
      title="Crear Orden"
      onSubmit={handleSubmit}
      isLoading={loading}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Registro de Recepción</InputLabel>
          <Select
            name="receptionRecordId"
            value={formData.receptionRecordId || ""}
            onChange={handleChange}
            label="Registro de Recepción"
            required
          >
            {receptionRecords.map((record) => (
              <MenuItem key={record.id} value={record.id}>
                {`ID: ${record.id} - Fecha: ${new Date(
                  record.arrivalDate
                ).toLocaleDateString()}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

        <TextField
          label="Detalles del Trabajo"
          name="workDetails"
          value={formData.workDetails}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          label="Costo"
          name="cost"
          type="number"
          value={formData.cost}
          onChange={handleChange}
          required
        />
      </Box>
    </ComponentFormInline>
  );
};

export default OrderCreate;
