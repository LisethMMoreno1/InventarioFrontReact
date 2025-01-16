import { Box, Button, Container } from "@mui/material";
import React from "react";
import AppRouter from "../../routes/AppRouter";
import FormInputsOrden from "../Order/FormInputsOrdenD";
import GeneralDashboard from "../componentesGenerales/GeneralDashboard/GeneralDashboard";

const OrderDetails: React.FC = () => {
  /*     const navigate = useNavigate();
   */

  return (
    <GeneralDashboard title="Registrar Detalle de Orden" routes={AppRouter}>
      <Container maxWidth={"lg"}>
        <FormInputsOrden />
        <Box mt={3}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Registrar
          </Button>
        </Box>
      </Container>
    </GeneralDashboard>
  );
};

export default OrderDetails;
