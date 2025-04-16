"use client";

import React, { useEffect, useState } from "react";

import { SelectChangeEvent } from "@mui/material";
import OrderForm from "./orderForm";
import useOrderStore from "../../store/order/useOrderStore";
import { Order } from "../../types/order/order.types";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";

const OrderCreate = () => {
  const { createOrder, loading, fetchReceptionRecords, receptionRecords } =
    useOrderStore();

  const [formData, setFormData] = useState<Partial<Order>>({
    orderNumber: "",
    status: "Activo",
    workDetails: "",
    cost: 0,
    receptionRecordId: undefined,
  });

  useEffect(() => {
    fetchReceptionRecords();
  }, [fetchReceptionRecords]);

  useEffect(() => {
    console.log("Reception Records:", receptionRecords);
  }, [receptionRecords]);

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
        handleChange={handleChange}
      />
    </ComponentFormInline>
  );
};

export default OrderCreate;
