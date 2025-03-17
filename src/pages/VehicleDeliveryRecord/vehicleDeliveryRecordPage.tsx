import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import CreateVehicleDeliveryRecord from "../../components/vehicleDeliveryRecord/vehicleDeliveryRecordCreate";

const VehicleDeliveryRecordPage: React.FC = () => {
  return (
    <Container>
      <CreateVehicleDeliveryRecord />
      <Outlet />
    </Container>
  );
};

export default VehicleDeliveryRecordPage;
