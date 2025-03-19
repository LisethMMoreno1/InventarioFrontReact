import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import CreateVehicleOwner from "../../components/vehicleOwner/vehicleOwnerCreate";

const VehicleOwnerPage: React.FC = () => {
  return (
    <Container>
      <CreateVehicleOwner />
      <Outlet />
    </Container>
  );
};

export default VehicleOwnerPage;
