import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { User } from "../../types/users/user.types";
import DataGridComponent from "../componentesGenerales/Tabla/tabla.components";
import EditUserModal from "./updateUserModal";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUserId(user.id_user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUserId(null);
  };

  const columns: GridColDef<User>[] = [
    { field: "id_user", headerName: "ID", width: 90 },
    { field: "code_tool", headerName: "Código de Utilitario", width: 150 },
    {
      field: "tool",
      headerName: "Tipo de Identificación",
      width: 200,
      renderCell: (params) => params.row.tool?.name || "N/A",
    },
    { field: "identificationNumber", headerName: "Identificación", width: 150 },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "email", headerName: "Correo", flex: 1 },
    { field: "role", headerName: "Rol", width: 120 },
    {
      field: "state",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => (params.value ? "Activo" : "Inactivo"),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
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
            onClick={() => console.log("Eliminar", params.row.id_user)}
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
        rows={users}
        columns={columns}
        title="Lista de Usuarios"
        getRowId={(row) => row.id_user}
      />

      {selectedUserId !== null && (
        <EditUserModal
          open={editModalOpen}
          identificationNumber={selectedUserId}
          onClose={handleCloseEditModal}
          onSuccess={fetchUsers} // Recargar lista después de editar
        />
      )}
    </>
  );
};

export default UserList;
