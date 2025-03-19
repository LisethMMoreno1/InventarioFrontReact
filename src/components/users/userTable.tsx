"use client";

import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";
import { User } from "../../types/users/user.types";
import DataGridComponent from "../componentesGenerales/Tabla/tabla.components";
import { useUserStore } from "../../store/user/useUserStore";
import DeleteItemModal from "../componentesGenerales/Tabla/ButtonTable/DeleteButton";
import EditUserModal from "./userEditModal";

const UserTable: React.FC = () => {
  const { users, fetchUsers, fetchUserById, deleteUser } = useUserStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    setIsLoading(false);
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    console.log("Editar usuario:", user);
    fetchUserById(user.identificationNumber);
  };

  const handleOpenDeleteModal = (user: User) => {
    setSelectedDeleteId(user.identificationNumber);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDeleteId(null);
  };

  const handleDeleteItem = async (id: number) => {
    await deleteUser(id);
  };

  const transformedUsers = users.map((user, index) => ({
    id_user: user.id_user || index + 1,
    ...user,
  }));

  const columns: GridColDef<User>[] = [
    {
      field: "tool",
      headerName: "Tipo de Identificación",
      width: 150,
      renderCell: (params) => params.row.tool?.name || "N/A",
    },
    {
      field: "identificationNumber",
      headerName: "Número de Identificación",
      width: 150,
    },
    { field: "name", headerName: "Nombre Completo", width: 150 },
    { field: "email", headerName: "Correo electronico", width: 250 },
    { field: "role", headerName: "Roles de usuario", width: 150 },
    {
      field: "state",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => (params.value ? "Activo" : "Inactivo"),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleOpenDeleteModal(params.row)}
            color="secondary"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <DataGridComponent
        rows={transformedUsers}
        columns={columns}
        title="Lista de Usuarios"
        getRowId={(row) => row.id_user}
        loading={isLoading}
      />

      {selectedDeleteId !== null && (
        <DeleteItemModal
          open={deleteModalOpen}
          itemId={selectedDeleteId}
          itemName="usuario"
          onClose={handleCloseDeleteModal}
          onSuccess={fetchUsers}
          deleteItem={handleDeleteItem}
        />
      )}
      <EditUserModal />
    </>
  );
};

export default UserTable;
