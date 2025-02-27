import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import CreateUser from "../../components/users/UserCreate";

const CreateUserPage: React.FC = () => {
  return (
    <Container>
      <CreateUser />
      <Outlet />
    </Container>
  );
};

export default CreateUserPage;
