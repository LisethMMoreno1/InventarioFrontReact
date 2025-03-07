import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect, useMemo, useState } from "react";
import { toolsService } from "../../services/toolsService";
import * as userService from "../../services/userService";
import { Tool } from "../../types/tool/tool.type";
import { User } from "../../types/users/user.types";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";

interface CreateUserProps {
  user?: User;
  onSuccess: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ user, onSuccess }) => {
  // Estado inicial basado en user
  const initialFormState = useMemo(
    (): User => ({
      id_user: user?.id_user || 0,
      name: user?.name || "",
      identificationNumber: user?.identificationNumber || "",
      email: user?.email || "",
      password: user?.password || "",
      code_tool: user?.code_tool || "",
      tool: user?.tool || {
        id: 0,
        name: "",
        code: "",
        type: "",
        description: "",
        created_at: new Date(),
        updated_at: new Date(),
      }, // ✅ Asegurar estructura completa
      state: user?.state ?? true,
      created_at: user?.created_at ? new Date(user.created_at) : new Date(),
      updated_at: user?.updated_at ? new Date(user.updated_at) : new Date(),
      accessToken: user?.accessToken || "",
      role: user?.role || "",
    }),
    [user]
  );

  const [formData, setFormData] = useState<User>(initialFormState);
  const [identificationOptions, setIdentificationOptions] = useState<Tool[]>(
    []
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    toolsService
      .getToolsByCode("CC")
      .then((data: Tool[]) => setIdentificationOptions(data))
      .catch((error) =>
        console.error(
          "Error al obtener datos para el tipo de identificación:",
          error
        )
      );
  }, []);

  useEffect(() => {
    if (saved) {
      setFormData(initialFormState);
      alert("Usuario creado exitosamente");
      setSaved(false);
    }
  }, [saved, initialFormState]);

  // Manejador para inputs de texto
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIdentificationTypeChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      tool: {
        ...prev.tool, // Mantener las propiedades previas de tool
        code: value,
      },
      code_tool: value,
    }));
  };

  const handleSubmit = async () => {
    // Extraemos las propiedades no necesarias en la petición
    const {
      id_user,
      created_at,
      updated_at,
      accessToken,
      state,
      tool,
      ...payload
    } = formData;

    // Asegurar que code_tool sea una cadena válida
    if (!payload.code_tool || typeof payload.code_tool !== "string") {
      console.error("Error: code_tool es inválido.");
      return;
    }

    console.log("Payload enviado:", payload);

    try {
      if (user) {
        await userService.updateUser(user.id_user, payload);
      } else {
        await userService.createUser(payload);
      }
      onSuccess();
      setSaved(true);
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  };

  return (
    <ComponentFormInline
      title={user ? "Editar Usuario" : "Crear Usuario del sistema"}
      onSubmit={handleSubmit}
      onCancel={() => setFormData(initialFormState)}
      submitLabel={user ? "Actualizar Usuario" : "Crear Usuario"}
    >
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo"
              name="email"
              value={formData.email}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="identification-type-label">
                Tipo de Identificación (CC)
              </InputLabel>
              <Select
                labelId="identification-type-label"
                name="identificationType"
                value={formData.code_tool}
                onChange={handleIdentificationTypeChange}
                label="Tipo de Identificación (CC)"
              >
                {identificationOptions.map((item) => (
                  <MenuItem key={item.id} value={item.code}>
                    {item.name} ({item.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Número de Identificación"
              name="identificationNumber"
              value={formData.identificationNumber}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Rol"
              name="role"
              value={formData.role}
              onChange={handleTextFieldChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </form>
    </ComponentFormInline>
  );
};

export default CreateUser;
