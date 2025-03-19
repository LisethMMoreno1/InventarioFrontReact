import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import useOrderStore from "../../../store/order/useOrderStore";
import { Order } from "../../../types/order/order.types";
import DataGridComponent from "../Tabla/tabla.components";

const OrderList: React.FC = () => {
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    if (!orders.length) {
      console.log("Ejecutando fetchOrders...");
      fetchOrders();
    }
  }, [fetchOrders, orders.length]);

  const handleEdit = (id: number) => {
    console.log("Editar orden con ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Eliminar orden con ID:", id);
  };

  const columns: GridColDef[] = [
    { field: "orderNumber", headerName: "Número de Orden", flex: 1 },
    {
      field: "createdAt",
      headerName: "Fecha de Creación",
      flex: 1,
      valueFormatter: (params: any) => {
        return params.value;
      },
    },
    {
      field: "status",
      headerName: "Estado",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Costo",
      flex: 1,
      type: "number",
      valueFormatter: (params: any) => {
        return params.value;
      },
    },

    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DataGridComponent
      rows={orders}
      columns={columns}
      title="Lista de Órdenes"
      getRowId={(row: Order) => row.id}
    />
  );
};

export default OrderList;
