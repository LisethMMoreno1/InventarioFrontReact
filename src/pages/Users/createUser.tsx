import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import CreateUser from "../../components/users/userCreate";

const CreateUserPage: React.FC = () => {
  const handleSuccess = () => {
    console.log("Ususario Creado correctamente");
  };
  return (
    <Container>
      <CreateUser onSuccess={handleSuccess} />
      <Outlet />
    </Container>
  );
};

export default CreateUserPage;
