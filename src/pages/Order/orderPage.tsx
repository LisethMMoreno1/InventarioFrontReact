import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import OrderCreate from "../../components/componentesGenerales/order/orderCreate";

const OrderPage: React.FC = () => {
  return (
    <Container>
      <OrderCreate />
      <Outlet />
    </Container>
  );
};

export default OrderPage;
