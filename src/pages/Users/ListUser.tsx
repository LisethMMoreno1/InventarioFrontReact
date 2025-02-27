import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import UserList from "../../components/users/UserList";

const RegistrePage: React.FC = () => {
  return (
    <Container>
      <UserList />
      <Outlet />
    </Container>
  );
};

export default RegistrePage;
