import React, { useEffect, useMemo, useState } from "react";
import { toolsService } from "../../services/toolsService";
import * as userService from "../../services/userService";
import { Tool } from "../../types/tool/tool.types";
import { User } from "../../types/users/user.types";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";
import { useUserStore } from "../../store/user/useUserStore";
import UserForm from "./userForm";
import { RolesEnum } from "../../types/role/roles.enum";

interface CreateUserProps {
  user?: User;
  onSuccess: () => void;
}

const CreateUser: React.FC<CreateUserProps> = ({ user, onSuccess }) => {
  const { formData, resetForm } = useUserStore();
  const [identificationOptions, setIdentificationOptions] = useState<Tool[]>(
    []
  );
  const [saved, setSaved] = useState(false);

  const initialFormState = useMemo(
    (): User => ({
      id_user: user?.id_user || 0,
      name: user?.name || "",
      identificationNumber: user?.identificationNumber
        ? parseInt(user.identificationNumber.toString(), 10)
        : 0,
      email: user?.email || "",
      password: user?.password || "",
      code_tool: user?.code_tool || "",
      role: user?.role || RolesEnum.OPERADOR_TECNICO,
      tool: user?.tool || {
        id: 0,
        name: "",
        code: "",
        type: "",
        description: "",
      },
      state: user?.state ?? true,
      created_at: user?.created_at ? new Date(user.created_at) : new Date(),
      updated_at: user?.updated_at ? new Date(user.updated_at) : new Date(),
      accessToken: user?.accessToken || "",
    }),
    [user]
  );

  useEffect(() => {
    toolsService
      .getToolsByCode("CC")
      .then((data: Tool[]) => setIdentificationOptions(data))
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  useEffect(() => {
    if (saved) {
      resetForm(initialFormState);
      alert("Usuario creado exitosamente");
      setSaved(false);
    }
  }, [saved, resetForm, initialFormState]);

  const handleSubmit = async () => {
    const {
      id_user,
      created_at,
      updated_at,
      accessToken,
      state,
      tool,
      ...payload
    } = formData;

    // Verifica que el role sea válido
    const validRole = Object.values(RolesEnum).includes(formData.role)
      ? formData.role
      : RolesEnum.OPERADOR_TECNICO;

    payload.role = validRole;

    payload.identificationNumber = parseInt(
      payload.identificationNumber.toString(),
      10
    );

    if (!payload.code_tool) {
      console.error("Error: code_tool es inválido.");
      return;
    }

    console.log("Enviando usuario con role:", payload.role);

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
      title={user ? "Editar Usuario" : "Crear Usuario"}
      onSubmit={handleSubmit}
      /*       onCancel={() => resetForm(initialFormState)}
       */ submitLabel={user ? "Actualizar Usuario" : "Crear Usuario"}
    >
      <UserForm identificationOptions={identificationOptions} />
    </ComponentFormInline>
  );
};

export default CreateUser;
