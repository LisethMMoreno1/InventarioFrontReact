import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ProductIList } from "../../../interfaces/Products/listaProduct";

const ButtonExport: React.FC = () => {
  const [products] = useState<ProductIList[]>([]);

  // Prepare data for EXCEL export
  const excelColumns = [
    "ID",
    "Nombre del Producto",
    "Descripcion",
    "Precio",
    "Cantidad",
    "Categoria",
  ];

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="flex-end" gap={2} mb={2}></Box>
    </Container>
  );
};

export default ButtonExport;
