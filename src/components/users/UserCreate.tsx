import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { createUser } from "../../services/userService";
import { getTypeOfGender } from "../../services/typeOfGenderService";
import { User } from "../../types/users/user.types";
import { TypeOfGender } from "../../types/TypeOfGender/typeOfGender.types";

const roles = [
  { id: 1, name: "Administrador" },
  { id: 2, name: "Vendedor" },
];

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [genders, setGenders] = useState<TypeOfGender[]>([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const data = await getTypeOfGender();
        setGenders(data);
      } catch (error) {
        setErrorMessage("Error al obtener tipos de género");
      }
    };
    fetchGenders();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<User>>();

  const onSubmit = async (data: Partial<User>) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await createUser(data);
      setSuccessMessage("Usuario creado exitosamente");
      reset();
    } catch (error) {
      setErrorMessage("Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "50%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Crear Usuario
      </Typography>

      {errorMessage && (
        <Typography color="error" variant="body1">
          {errorMessage}
        </Typography>
      )}
      {successMessage && (
        <Typography color="success.main" variant="body1">
          {successMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "El nombre es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "El email es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email inválido",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo Electrónico"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "La contraseña es obligatoria" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Controller
          name="typeOfGender"
          control={control}
          rules={{ required: "El género es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Género"
              fullWidth
              margin="normal"
              error={!!errors.typeOfGender}
              helperText={errors.typeOfGender?.message}
              onChange={(e) =>
                field.onChange(
                  genders.find(
                    (g) => g.id_typeOfGender === Number(e.target.value)
                  ) || null
                )
              }
            >
              {genders.map((gender) => (
                <MenuItem
                  key={gender.id_typeOfGender}
                  value={gender.id_typeOfGender}
                >
                  {gender.name_typeOfGender}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Crear Usuario"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateUser;
