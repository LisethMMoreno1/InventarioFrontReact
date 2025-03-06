/* import React, { useState } from "react";
import { Container, Button } from "@mui/material";
import CreateTool from "../../components/tool/createTool";
import ListTool from "../../components/tool/listTool";
import { Outlet } from "react-router-dom";

const ToolPage: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleSuccess = () => {
    // Se alterna refresh para actualizar la lista y se cierra el diálogo
    setRefresh((prev) => !prev);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Button variant="contained" onClick={handleOpen}>
        Crear Herramienta
      </Button>
      <CreateTool onSuccess={handleSuccess} open={open} onClose={handleClose} />
      <ListTool refresh={refresh} />
      <Outlet />
    </Container>
  );
};

export default ToolPage;
 */

import React, { useState } from "react";
import { Container } from "@mui/material";

import { Outlet } from "react-router-dom";
import CreateTool from "../../components/tool/createTool";
import ListTool from "../../components/tool/listTool";

const ToolPage: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Container>
      <CreateTool onSuccess={handleSuccess} />
      <ListTool refresh={refresh} />
      <Outlet />
    </Container>
  );
};

export default ToolPage;
