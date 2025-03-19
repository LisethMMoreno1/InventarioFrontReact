import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import VehicleOwnerList from "../../components/vehicleOwner/vehicleOwnerList";

const VehicleOwnerListPage: React.FC = () => {
  return (
    <Container>
      <VehicleOwnerList />
      <Outlet />
    </Container>
  );
};

export default VehicleOwnerListPage;
