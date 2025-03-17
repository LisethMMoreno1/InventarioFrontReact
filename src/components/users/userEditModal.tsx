import React, { useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useUserStore } from "../../store/user/useUserStore";

const EditUserModal: React.FC = () => {
  const {
    editModalOpen,
    selectedUser,
    setEditModalOpen,
    updateUser,
    setSelectedUser,
  } = useUserStore();

  useEffect(() => {
    if (!editModalOpen) {
      setSelectedUser(null);
    }
  }, [editModalOpen, setSelectedUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUser) return;
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (selectedUser) {
      await updateUser(selectedUser);
    }
  };

  return (
    <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "white",
          margin: "auto",
          marginTop: 5,
          width: 400,
        }}
      >
        <h2>Editar Usuario</h2>
        {selectedUser && (
          <>
            <TextField
              label="Tipo de Identificación"
              name="tool"
              value={selectedUser.tool.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Numero de Identificación"
              name="identificationNumber"
              value={selectedUser.identificationNumber}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Nombre"
              name="name"
              value={selectedUser.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Correo"
              name="email"
              value={selectedUser.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            sx={{ marginRight: 1 }}
          >
            Guardar
          </Button>
          <Button
            onClick={() => setEditModalOpen(false)}
            color="secondary"
            variant="outlined"
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
