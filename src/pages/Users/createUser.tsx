import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import CreateUser from "../../components/users/UserCreate";

const CreateUserPage: React.FC = () => {
  // Función que se ejecuta al crear una herramienta correctamente
  const handleSuccess = () => {
    console.log("Ususario Creado correctamente");
    // Aquí puedes agregar lógica adicional, como refrescar la lista o redireccionar
  };
  return (
    <Container>
      <CreateUser onSuccess={handleSuccess} />
      <Outlet />
    </Container>
  );
};

export default CreateUserPage;
