import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { RolesInter } from "../../../interfaces/Rol/rol";
import { GenreInter } from "../../../interfaces/typeOfGenders/typeOfGenders";
import { typeOfIdentification } from "../../../interfaces/typeOfIdentification/typeOfIdentification";
import { NewUser } from "../../../interfaces/Users/UserCreate";
import { getTypeOfGenders } from "../../../services/api/genreService/genreService";
import { getRoles } from "../../../services/api/RolesService/rolesService";
import { getTypeOfIdentifications } from "../../../services/api/typeOfIdentificationService/typeOfIdentificationService";
import { PostUsers } from "../../../services/api/userService/userService";
import { theme } from "../../../styles/theme";
import { registreSchema } from "../../../types/users/registre/registreSchemas";
import ActionButton from "../../componentesGenerales/Boton/ActionButton";

const Registre: React.FC = () => {
  const [roles, setRoles] = useState<RolesInter[]>([]);
  const [typeOfIdentifications, setTypeOfIdentifications] = useState<
    typeOfIdentification[]
  >([]);
  const [typeOfGenders, setTypeOfGenders] = useState<GenreInter[]>([]);
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar la carga del formulario

  const formik = useFormik({
    initialValues: {
      typeOfIdentification: "",
      identificationNumber: "",
      firstName: "",
      middleName: "",
      firstLastName: "",
      secondLastName: "",
      phoneNumber: "",
      email: "",
      genre: "",
      typeOfRole: "",
      password: "",
    },
    validationSchema: registreSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const userRequest: NewUser = {
          id: 0,
          typeOfIdentificationId: Number(values.typeOfIdentification),
          identificationNumber: values.identificationNumber,
          firstName: values.firstName,
          middleName: values.middleName,
          firstLastName: values.firstLastName,
          secondLastName: values.secondLastName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          genre: Number(values.genre),
          role: Number(values.typeOfRole),
          password: values.password,
        };

        const response = await PostUsers(userRequest);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        alert("Usuario registrado exitosamente");
        resetForm();
      } catch (error) {
        alert("Hubo un problema al registrar el usuario");
      } finally {
        setLoading(false); // Termina la carga
      }
    },
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchTypeOfGenders = async () => {
      try {
        const GenreData = await getTypeOfGenders();
        setTypeOfGenders(GenreData);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };

    fetchTypeOfGenders();
  }, []);

  useEffect(() => {
    const fetchTypeOfIdentifications = async () => {
      try {
        const typeOfIdentificationsData = await getTypeOfIdentifications();
        setTypeOfIdentifications(typeOfIdentificationsData);
      } catch (error) {
        console.error("Error al obtener tipos de identificación:", error);
      }
    };

    fetchTypeOfIdentifications();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: "flex",
          bgcolor: "background.default",
          minHeight: "50vh",
        }}
      >
        <Box>
          <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: "1200px" }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Crear Nuevo Usuario
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
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
                            {formik.errors.typeOfIdentification}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="identificationNumber"
                      name="identificationNumber"
                      label="Número de Identificación"
                      value={formik.values.identificationNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.identificationNumber &&
                        formik.errors.identificationNumber
                          ? formik.errors.identificationNumber
                          : ""
                      }
                      error={
                        formik.touched.identificationNumber &&
                        Boolean(formik.errors.identificationNumber)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="firstName"
                      name="firstName"
                      label="Primer Nombre"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                          ? formik.errors.firstName
                          : ""
                      }
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="middleName"
                      name="middleName"
                      label="Segundo Nombre"
                      value={formik.values.middleName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.middleName && formik.errors.middleName
                          ? formik.errors.middleName
                          : ""
                      }
                      error={
                        formik.touched.middleName &&
                        Boolean(formik.errors.middleName)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="firstLastName"
                      name="firstLastName"
                      label="Primer Apellido"
                      value={formik.values.firstLastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.firstLastName &&
                        formik.errors.firstLastName
                          ? formik.errors.firstLastName
                          : ""
                      }
                      error={
                        formik.touched.firstLastName &&
                        Boolean(formik.errors.firstLastName)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="secondLastName"
                      name="secondLastName"
                      label="Segundo Apellido"
                      value={formik.values.secondLastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.secondLastName &&
                        formik.errors.secondLastName
                          ? formik.errors.secondLastName
                          : ""
                      }
                      error={
                        formik.touched.secondLastName &&
                        Boolean(formik.errors.secondLastName)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Número de Teléfono"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? formik.errors.phoneNumber
                          : ""
                      }
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      name="email"
                      label="Correo Electrónico"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : ""
                      }
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
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
                          {formik.errors.genre}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="typeOfRole-label">Rol</InputLabel>
                      <Select
                        labelId="typeOfRole-label"
                        id="typeOfRole"
                        name="typeOfRole"
                        value={formik.values.typeOfRole}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <MenuItem value="">
                          <em>Seleccione...</em>
                        </MenuItem>
                        {roles.map((role) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.typeOfRole}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.typeOfRole &&
                        formik.errors.typeOfRole && (
                          <FormHelperText error>
                            {formik.errors.typeOfRole}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="password"
                      name="password"
                      label="Contraseña"
                      type="password"
                      autoComplete="current-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.password && formik.errors.password
                          ? formik.errors.password
                          : ""
                      }
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                    />
                  </Grid>
                </Grid>

                <ActionButton
                  loading={loading}
                  text="Guardar Usuario"
                  loadingText="Guardando..."
                  onClick={formik.handleSubmit}
                />
              </form>
            </Box>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Registre;
