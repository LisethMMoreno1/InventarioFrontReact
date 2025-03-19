"use client";

import React, { useEffect, useState } from "react";
import useOrderStore from "../../../store/order/useOrderStore";
import { Order } from "../../../types/order/order.types";
import ComponentFormInline from "../Form/componentFormInline";
import { SelectChangeEvent } from "@mui/material";
import OrderForm from "./orderForm";

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
    orderNumber: "",
    status: "Activo",
    workDetails: "",
    cost: 0,
    receptionRecordId: undefined,
    deliveryRecordId: undefined,
  });

  useEffect(() => {
    fetchReceptionRecords();
    fetchDeliveryRecords();
  }, [fetchDeliveryRecords, fetchReceptionRecords]);

  useEffect(() => {
    console.log("Reception Records:", receptionRecords);
    console.log("Delivery Records:", deliveryRecords);
  }, [receptionRecords, deliveryRecords]);

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
    const { orderNumber, ...dataToSend } = formData;
    dataToSend.cost = Number(dataToSend.cost);

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
      <OrderForm
        formData={formData}
        receptionRecords={receptionRecords}
        deliveryRecords={deliveryRecords}
        handleChange={handleChange}
      />
    </ComponentFormInline>
  );
};

export default OrderCreate;
