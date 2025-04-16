import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import CreateVehicleExitRecord from "../../components/vehicleExitRecord/vehicleExitRecordCreate";

const VehicleExitRecordPage: React.FC = () => {
  return (
    <Container>
      <CreateVehicleExitRecord />
      <Outlet />
    </Container>
  );
};

export default VehicleExitRecordPage;
