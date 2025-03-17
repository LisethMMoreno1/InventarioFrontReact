import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import OrderPage from "../pages/Order/orderPage";
import ToolPage from "../pages/Tool/toolPage";
import { default as CreateUserPage } from "../pages/Users/createUser";
import UserLisPage from "../pages/Users/listUser";
import VehicleDeliveryRecordPage from "../pages/VehicleDeliveryRecord/vehicleDeliveryRecordPage";
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
        path: "Registro de entrega de vehículos",
        element: <VehicleDeliveryRecordPage />,
        sidebarProps: {
          displayText: "Registro de entrega de vehículos",
          icon: <CarRepairIcon />,
        },
      },
      {
        path: "Registro de recepción de vehículos",
        element: <VehicleReceptionRecordPage />,
        sidebarProps: {
          displayText: "Registro de recepción de vehículos",
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
        path: "Lista de Productos",
        /*  element: <ListProductsPage />, */
        sidebarProps: {
          displayText: "Lista de Productos",
          icon: <InventoryIcon />,
        },
      },
      {
        path: "Registro de Compras",
        /*     element: <PurchasePage />, */
        sidebarProps: {
          displayText: "Registro de Compras",
          icon: <InventoryIcon />,
        },
      },
      {
        path: "Lista de Compras",
        /*  element: <ListPurchasePage />, */
        sidebarProps: {
          displayText: "Lista de Compras",
          icon: <InventoryIcon />,
        },
      },
    ],
  },
  {
    path: "/pagos",
    sidebarProps: {
      displayText: "Pagos",
      icon: <PersonIcon />,
    },
    children: [
      {
        path: "Lista de Pagos",
        /*    element: <PaymentListPage />, */
        sidebarProps: {
          displayText: "Lista de Pagos",
          icon: <AccountBoxIcon />,
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
