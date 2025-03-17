import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import VehicleReceptionRecordCreate from "../../components/vehicleReceptionRecord/vehicleReceptionRecordCreate";

const VehicleReceptionRecordPage: React.FC = () => {
  return (
    <Container>
      <VehicleReceptionRecordCreate />
      <Outlet />
    </Container>
  );
};

export default VehicleReceptionRecordPage;
