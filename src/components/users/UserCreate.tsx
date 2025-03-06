import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { User } from "../../types/users/user.types";
import { Tool } from "../../types/tool/tool.type";
// Importamos el servicio de usuario y herramientas (utilizando exportaciones nombradas)
import * as userService from "../../services/userService";
import { toolsService } from "../../services/toolsService";

interface CreateUserProps {
  user?: User;
  onSuccess: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ user, onSuccess }) => {
  // Nota: Usamos un estado que extiende el tipo User para incluir 'role'
  const [formData, setFormData] = useState<User & { role?: string }>({
    id_user: user?.id_user || 0,
    name: user?.name || "",
    identificationNumber: user?.identificationNumber || "",
    email: user?.email || "",
    password: user?.password || "",
    code_tool: user?.code_tool || "",
    tool: user?.tool || {
      id: 0,
      name: "",
      type: "",
      code: "",
      description: "",
      state: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    state: user?.state ?? true,
    created_at: user?.created_at ? new Date(user.created_at) : new Date(),
    updated_at: user?.updated_at ? new Date(user.updated_at) : new Date(),
    accessToken: user?.accessToken || "",
    role: (user as any)?.role || "", // Se agrega la propiedad role
  });

  // Opciones para los selects: se obtienen del servicio de herramientas y son de tipo Tool
  const [identificationOptions, setIdentificationOptions] = useState<Tool[]>(
    []
  );
  const [ggUserData, setGgUserData] = useState<Tool[]>([]);

  useEffect(() => {
    // Se obtienen las herramientas filtradas por "CC" para el select de identificación
    toolsService
      .getToolsByCode("CC")
      .then((data: Tool[]) => setIdentificationOptions(data))
      .catch((error: any) =>
        console.error("Error al obtener datos para CC:", error)
      );

    // Se obtienen las herramientas filtradas por "GG" para el select de código GG
    toolsService
      .getToolsByCode("GG")
      .then((data: Tool[]) => setGgUserData(data))
      .catch((error: any) =>
        console.error("Error al obtener datos para GG:", error)
      );
  }, []);

  // Manejador para inputs de texto (TextField)
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador para los Select de Material-UI
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Extraer las propiedades que no se deben enviar
    const {
      id_user,
      tool,
      created_at,
      updated_at,
      accessToken,
      state,
      ...payload
    } = formData;

    console.log("Payload enviado:", payload); // Se imprime en consola el payload final

    try {
      if (user) {
        await userService.updateUser(user.id_user, payload);
      } else {
        await userService.createUser(payload);
      }
      onSuccess();
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        {user ? "Editar Usuario" : "Crear Usuario"}
      </Typography>
      <TextField
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleTextFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Correo"
        name="email"
        value={formData.email}
        onChange={handleTextFieldChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleTextFieldChange}
        fullWidth
        margin="normal"
      />

      {/* Select para "Tipo de Identificación" filtrado por "CC" */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="identification-number-label">
          Tipo de Identificación (CC)
        </InputLabel>
        <Select
          labelId="identification-number-label"
          name="identificationNumber"
          value={formData.identificationNumber}
          onChange={handleSelectChange}
          label="Tipo de Identificación (CC)"
        >
          {identificationOptions.map((item) => (
            <MenuItem key={item.id} value={item.code}>
              {item.name} ({item.code})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select para "Código GG" */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="code-gg-label">Código GG</InputLabel>
        <Select
          labelId="code-gg-label"
          name="code_tool"
          value={formData.code_tool}
          onChange={handleSelectChange}
          label="Código GG"
        >
          {ggUserData.map((item) => (
            <MenuItem key={item.id} value={item.code}>
              {item.name} ({item.code})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Campo para Rol (obligatorio según el backend) */}
      <TextField
        label="Rol"
        name="role"
        value={formData.role}
        onChange={handleTextFieldChange}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {user ? "Actualizar" : "Crear"}
      </Button>
    </Container>
  );
};

export default CreateUser;
