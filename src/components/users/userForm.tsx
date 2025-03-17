import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Tool } from "../../types/tool/tool.types";
import { useUserStore } from "../../store/user/useUserStore";
import { RolesEnum, rolesOptions } from "../../types/role/roles.enum";

interface UserFormProps {
  identificationOptions: Tool[];
}

const UserForm: React.FC<UserFormProps> = ({ identificationOptions }) => {
  const { formData, setFormData } = useUserStore();

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleIdentificationTypeChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData({
      code_tool: value,
      tool: { ...formData.tool, code: value },
    });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    const newRole = e.target.value as RolesEnum;
    useUserStore.getState().setRole(newRole);
  };

  return (
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
            Tipo de Identificación
          </InputLabel>
          <Select
            labelId="identification-type-label"
            name="identificationType"
            value={formData.code_tool}
            onChange={handleIdentificationTypeChange}
            label="Tipo de Identificación"
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
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="role-label">Rol</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            label="Rol"
          >
            {rolesOptions.map((roleOption: RolesEnum) => (
              <MenuItem key={roleOption} value={roleOption}>
                {roleOption}
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
    </Grid>
  );
};

export default UserForm;
