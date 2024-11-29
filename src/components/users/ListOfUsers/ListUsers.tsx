import React, { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { User } from "../../../interfaces/Users/User";
import { getUsers } from "../../../services/api/userService/userService";
import useStore from "../../../stores/UserStore";
import DeleteButton from "../../componentesGenerales/Tabla/ButtonTable/DeleteButton";
import EditButton from "../../componentesGenerales/Tabla/ButtonTable/EditButton";
import ViewButton from "../../componentesGenerales/Tabla/ButtonTable/ViewButton";
import DataGridComponent from "../../componentesGenerales/Tabla/tabla.components";
import UserModal from "./UserModal";
import EditUserModal from "./EditUserModal";

const UserList: React.FC = () => {
  const { users, setUsers } = useStore((state) => ({
    users: state.users,
    setUsers: state.setUsers,
  }));

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setUsers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "typeOfIdentification",
      headerName: "Tipo de Documento",
      width: 180,
      renderCell: ({ row }) => row?.typeOfIdentification?.name.toUpperCase(),
    },
    {
      field: "identificationNumber",
      headerName: "Número de Documento",
      width: 180,
      renderCell: (params) => <span>{String(params.value).toUpperCase()}</span>,
    },
    {
      field: "fullName",
      headerName: "Nombre Completo",
      width: 200,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.middleName || ""} ${
          row.firstLastName || ""
        } ${row.secondLastName || ""}`.toUpperCase(),
    },
    {
      field: "phoneNumber",
      headerName: "Número de Teléfono",
      width: 150,
      renderCell: (params) => <span>{String(params.value).toUpperCase()}</span>,
    },
    {
      field: "email",
      headerName: "Correo Electrónico",
      width: 200,
      renderCell: (params) => <span>{String(params.value).toUpperCase()}</span>,
    },
    {
      field: "role",
      headerName: "Rol de Usuario",
      width: 120,
      renderCell: ({ row }) => row?.role?.typeOfRole.toUpperCase(),
    },
    {
      field: "genre",
      headerName: "Género",
      width: 120,
      renderCell: ({ row }) => row?.genre?.genre.toUpperCase(),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 180,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ViewButton onClick={() => handleOpenModal(params.row)} />
          <EditButton onClick={() => handleEditUser(params.row)} />
          <DeleteButton onClick={() => handleDeleteClick(params.row)} />
        </Box>
      ),
    },
  ];



  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);  // Open the modal when editing a user
  };

  const handleSaveUser = (updatedUser: User) => {
    // Update the user (e.g., via API or state)
    setSelectedUser(updatedUser);  // Update the selected user state with the edited data
    setEditModalOpen(false);       // Close the modal after saving
  };


  const handleDeleteClick = (user: User) => {
    alert(`Borrar usuario: ${user.firstName} ${user.firstLastName}`);
  };

  return (
    <Box sx={{ height: "calc(90vh - 100px)", width: "100%", padding: "20px" }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <PeopleIcon fontSize="large" />
        Lista de Usuarios
      </Typography>
      <DataGridComponent rows={users} columns={columns} />
      <UserModal
        open={openModal}
        handleClose={handleCloseModal}
        selectedUser={selectedUser}
      />
       <EditUserModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </Box>
  );
};

export default UserList;
