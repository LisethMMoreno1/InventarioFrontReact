import { CircularProgress, Container } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { purchaseOfProductI } from "../../interfaces/PurchaseOfProduct/purchaseOfProduct";
import { getPurchases } from "../../services/api/PurchaseOfProductServices/purchaseOfProductService";
import DataGridComponent from "../componentesGenerales/Tabla/tabla.components";

const ListPurchase = () => {
  const [purchases, setPurchases] = useState<purchaseOfProductI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const fetchedPurchases = await getPurchases();
        setPurchases(fetchedPurchases);
      } catch (error) {
        console.error("Error fetching purchaseOfProduct:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const columns: GridColDef<purchaseOfProductI>[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "nameofProduct",
      headerName: "Nombre del Producto",
      width: 250,
      renderCell: ({ row }) => row?.product?.nameofProduct,
    },
    {
      field: "price",
      headerName: "Precio",
      type: "number",
      width: 100,
      renderCell: ({ row }) => row?.product?.price,
    },
    {
      field: "customer",
      headerName: "Cliente",
      width: 100,
      renderCell: ({ row }) => row?.customer?.identificationNumber,
    },
    { field: "quantity", headerName: "quantity", width: 100 },
    { field: "purchaseCode", headerName: "Codigo de Compra", width: 250 },
  ];

  return (
    <Container maxWidth="lg">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <DataGridComponent rows={purchases} columns={columns}>
            Lista de Compras
          </DataGridComponent>
        </>
      )}
    </Container>
  );
};

export default ListPurchase;
