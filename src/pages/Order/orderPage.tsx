import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import OrderCreate from "../../components/componentesGenerales/order/orderCreate";
import OrderList from "../../components/componentesGenerales/order/OrderList";

const OrderPage: React.FC = () => {
  return (
    <Container>
      <OrderCreate />
      <Outlet />
      <OrderList />
    </Container>
  );
};

export default OrderPage;
