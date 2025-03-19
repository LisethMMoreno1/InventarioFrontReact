import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import useVehicleOwnerStore from "../../store/vehicleOwner/useVehicleOwnerStore";
import DataGridComponent from "../componentesGenerales/Tabla/tabla.components";

const VehicleOwnerList: React.FC = () => {
  const { vehicleOwners, fetchVehicleOwners, loading, error } =
    useVehicleOwnerStore();

  const [selectedToolId, setSelectedToolId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchVehicleOwners();
    setIsLoading(false);
  }, [fetchVehicleOwners]);

  const handleEdit = (id: number) => {
    console.log("Editar propietario con ID:", id);
    // Aquí puedes agregar la lógica para la edición
  };

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Nombre Completo", flex: 2 },
    {
      field: "identificationNumber",
      headerName: "Numero de Identificación",
      flex: 2,
    },
    { field: "phoneNumber", headerName: "Teléfono", flex: 1 },
    { field: "email", headerName: "Correo", flex: 1 },
    { field: "vehicleBrand", headerName: "Marca", flex: 1 },
    { field: "vehicleModel", headerName: "Modelo", flex: 1 },
    { field: "licensePlate", headerName: "Placa", flex: 1 },
    { field: "vehicleColor", headerName: "Color", flex: 1 },
    {
      field: "insuranceValid",
      headerName: "Seguro Vigente",
      flex: 1,
      type: "boolean",
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedToolId(params.row.id);
              setOpenDeleteModal(true);
            }}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <DataGridComponent
      rows={vehicleOwners}
      columns={columns}
      title="Lista de Propietarios de Vehículos"
      getRowId={(row: any) => row.id}
      loading={isLoading}
    />
  );
};

export default VehicleOwnerList;
