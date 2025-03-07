import React, { useCallback, useEffect, useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { User } from "../../types/users/user.types";
import * as userService from "../../services/userService";

interface EditUserModalProps {
  open: boolean;
  identificationNumber: number;
  onClose: () => void;
  onSuccess: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  identificationNumber,
  onClose,
  onSuccess,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    if (!identificationNumber) return;

    try {
      const data = await userService.getUserById(identificationNumber);
      setUser(data);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  }, [identificationNumber]); // `id` es una dependencia de `fetchUser`

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (user) {
      try {
        await userService.updateUser(identificationNumber, user);
        onSuccess();
        onClose();
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        {user && (
          <>
            <TextField
              label="Nombre"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Correo"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Rol"
              name="role"
              value={user.role}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </>
        )}
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          Guardar
        </Button>
        <Button
          onClick={onClose}
          color="secondary"
          sx={{ marginTop: 2, marginLeft: 2 }}
        >
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
