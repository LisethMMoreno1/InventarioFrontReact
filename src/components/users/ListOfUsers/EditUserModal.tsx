import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { SelectChangeEvent } from "@mui/material/Select"; // Import the correct type
import ActionButton from "../../componentesGenerales/Boton/ActionButton";

interface User {
  firstName: string;
  middleName?: string;
  firstLastName: string;
  secondLastName?: string;
  typeOfIdentification?: { name: string };
  identificationNumber: string;
  phoneNumber: string;
  email: string;
  [key: string]: string | { name: string } | undefined; // Add this index signature
}

interface EditUserModalProps {
  open: boolean;
  handleClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  handleClose,
  user,
  onSave,
}) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar la carga del formulario

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (editedUser) {
      onSave(editedUser);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-user-modal"
      aria-describedby="modal-to-edit-user-details"
    >
      <Paper
        elevation={5}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxWidth: "90%",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          overflow: "auto",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            Edit User
          </Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={editedUser?.firstName || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={editedUser?.middleName || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Last Name"
              name="firstLastName"
              value={editedUser?.firstLastName || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Second Last Name"
              name="secondLastName"
              value={editedUser?.secondLastName || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="type-of-identification-label">
                Type of Identification
              </InputLabel>
              <Select
                labelId="type-of-identification-label"
                name="typeOfIdentification"
                value={editedUser?.typeOfIdentification?.name || ""}
                label="Type of Identification"
              >
                <MenuItem value="DNI">DNI</MenuItem>
                <MenuItem value="Passport">Passport</MenuItem>
                <MenuItem value="Driver's License">Driver's License</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Identification Number"
              name="identificationNumber"
              value={editedUser?.identificationNumber || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={editedUser?.phoneNumber || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={editedUser?.email || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" name="role" label="Role">
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="genre-label">Gender</InputLabel>
              <Select labelId="genre-label" name="genre" label="Gender">
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
     
        <ActionButton
                  loading={loading}
                  text="Actualizar Usuario"
                  loadingText="Guardando..."
                  startIcon={<SaveIcon />}

                  onClick={handleSave}
                />
      </Paper>
    </Modal>
  );
};

export default EditUserModal;
