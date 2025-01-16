import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { RolesInter } from "../../../interfaces/Rol/rol";
import { GenreInter } from "../../../interfaces/typeOfGenders/typeOfGenders";
import { typeOfIdentification } from "../../../interfaces/typeOfIdentification/typeOfIdentification";
import { User } from "../../../interfaces/Users/User";
import { registreSchema } from "../../../types/users/registre/registreSchemas";
import ActionButton from "../../componentesGenerales/Boton/ActionButton";

interface EditUserModalProps {
  open: boolean;
  onCancel: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}
const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onCancel,
  user,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);
  const [roles] = useState<RolesInter[]>([]);
  const [typeOfIdentifications] = useState<typeOfIdentification[]>([]);
  const [typeOfGenders] = useState<GenreInter[]>([]);
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      firstLastName: user?.firstLastName || "",
      middleName: user?.middleName || "",
      secondLastName: user?.secondLastName || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role ? user.role.typeOfRole : "",
      email: user?.email || "",
      typeOfIdentification: user?.typeOfIdentification || { name: "" },
      identificationNumber: user?.identificationNumber || "",
      genre: user?.genre || { genre: "" },
    },
    validationSchema: registreSchema,
    onSubmit: (values) => {
      onSave({
        ...values,
        role: { typeOfRole: values.role }, // Convertimos 'role' a un objeto con 'typeOfRole'
        typeOfIdentification: values.typeOfIdentification,
        genre: values.genre,
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
  };

  const handleSave = async () => {
    setLoading(true);
    await formik.submitForm();
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
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
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h5" component="h2">
            Edit User
          </Typography>
          <IconButton onClick={onCancel} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={formik.values.middleName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Last Name"
              name="firstLastName"
              value={formik.values.firstLastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Second Last Name"
              name="secondLastName"
              value={formik.values.secondLastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="typeOfIdentification-label">
                Tipo de Identificación
              </InputLabel>
              <Select
                labelId="typeOfIdentification-label"
                id="typeOfIdentification"
                name="typeOfIdentification"
                value={formik.values.typeOfIdentification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="">
                  <em>Seleccione...</em>
                </MenuItem>
                {typeOfIdentifications.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.typeOfIdentification &&
                formik.errors.typeOfIdentification && (
                  <FormHelperText error>
                    {formik.touched.typeOfIdentification &&
                    formik.errors.typeOfIdentification
                      ? formik.errors.typeOfIdentification.toString()
                      : ""}
                  </FormHelperText>
                )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Identification Number"
              name="identificationNumber"
              value={formik.values.identificationNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="typeOfRole-label">Rol</InputLabel>
              <Select
                labelId="typeOfRole-label"
                id="typeOfRole"
                name="role" // Cambié el nombre a "role" para que coincida con el nombre del valor en formik
                value={formik.values.role} // El valor que debe ser un string (no un objeto)
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="">
                  <em>Seleccione...</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.typeOfRole}>
                    {" "}
                    {/* El valor debe ser 'role.typeOfRole' */}
                    {role.typeOfRole}{" "}
                    {/* Este es el texto visible en el desplegable */}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.role && formik.errors.role && (
                <FormHelperText error>{formik.errors.role}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="genre-label">Género</InputLabel>
              <Select
                labelId="genre-label"
                id="genre"
                name="genre"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="">
                  <em>Seleccione...</em>
                </MenuItem>
                {typeOfGenders.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.genre}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.genre && formik.errors.genre && (
                <FormHelperText error>
                  {formik.touched.genre && formik.errors.genre
                    ? formik.errors.genre.toString()
                    : ""}
                </FormHelperText>
              )}
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
