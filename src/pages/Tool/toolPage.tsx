import { Container } from "@mui/material";
import React from "react";

import { Outlet } from "react-router-dom";
import CreateTool from "../../components/tool/createTool";
import ListTool from "../../components/tool/toolList";

const ToolPage: React.FC = () => {
  const handleToolCreationSuccess = () => {
    console.log("Herramienta creada con éxito");
  };
  return (
    <Container>
      <CreateTool onSuccess={handleToolCreationSuccess} />
      <ListTool />
      <Outlet />
    </Container>
  );
};

export default ToolPage;
