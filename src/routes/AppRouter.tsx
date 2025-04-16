import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import OrderPage from "../pages/Order/orderPage";
import ToolPage from "../pages/Tool/toolPage";
import { default as CreateUserPage } from "../pages/Users/createUser";

import UserLisPage from "../pages/Users/ListUser";
import VehicleExitRecordPage from "../pages/VehicleExitRecord/vehicleExitRecordPage";
import VehicleOwnerListPage from "../pages/VehicleOwner/vehicleOwnerList";
import VehicleOwnerPage from "../pages/VehicleOwner/vehicleOwnerPage";
import VehicleReceptionRecordPage from "../pages/VehicleReceptionRecord/vehicleReceptionRecordPage";
import { RouteType } from "./route";

const AppRouter: RouteType[] = [
  {
    path: "registre",
    sidebarProps: {
      displayText: "Usuario",
      icon: <PersonIcon />,
    },
    children: [
      {
        path: "Registro de Usuario",
        element: <CreateUserPage />,
        sidebarProps: {
          displayText: "Registro de Usuario",
          icon: <AccountBoxIcon />,
        },
      },
      {
        path: "Lista de Usuario",
        element: <UserLisPage />,
        sidebarProps: {
          displayText: "Lista de Usuario",
          icon: <ListAltIcon />,
        },
      },
    ],
  },
  {
    path: "Vehiculo",
    sidebarProps: {
      displayText: "Vehiculo",
      icon: <CarRepairIcon />,
    },
    children: [
      {
        path: "Registro de recepción de vehículos",
        element: <VehicleReceptionRecordPage />,
        sidebarProps: {
          displayText: "Registro de recepción de vehículos",
          icon: <CarRepairIcon />,
        },
      },
      {
        path: "Registro de entrega de vehículos",
        element: <VehicleExitRecordPage />,
        sidebarProps: {
          displayText: "Registro de entrega de vehículos",
          icon: <CarRepairIcon />,
        },
      },
    ],
  },
  {
    path: "Order",
    sidebarProps: {
      displayText: "Order",
      icon: <BookmarkBorderIcon />,
    },
    children: [
      {
        path: "Registro de Order",
        element: <OrderPage />,
        sidebarProps: {
          displayText: "Registro de Order",
          icon: <BookmarkBorderIcon />,
        },
      },
      {
        path: "Propietario del vehículo",
        element: <VehicleOwnerPage />,
        sidebarProps: {
          displayText: "Propietario del vehículo",
          icon: <PersonAddAlt1Icon />,
        },
      },
      {
        path: " Lista de Propietario de vehículos",
        element: <VehicleOwnerListPage />,
        sidebarProps: {
          displayText: "Lista de Propietario de vehículos",
          icon: <PersonAddAlt1Icon />,
        },
      },
    ],
  },
  {
    path: "Mantenimiento",
    sidebarProps: {
      displayText: "Parametros",
      icon: <SettingsIcon />,
    },
    children: [
      {
        path: "Utilitarios",
        element: <ToolPage />,
        sidebarProps: {
          displayText: "Utilitarios",
          icon: <CardMembershipIcon />,
        },
      },
    ],
  },
];

export default AppRouter;
