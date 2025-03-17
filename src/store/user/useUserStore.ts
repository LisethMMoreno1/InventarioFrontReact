import { create } from "zustand";
import * as userService from "../../services/userService";
import { UserStore } from "./userStore";
import { RolesEnum } from "../../types/role/roles.enum";

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  selectedUser: null,
  selectedUserId: null,
  editModalOpen: false,
  loading: false,
  formData: {
    name: "",
    email: "",
    password: "",
    code_tool: "",
    identificationNumber: "",
    role: RolesEnum.OPERADOR_TECNICO,
  },

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  resetForm: () =>
    set({
      formData: {
        name: "",
        email: "",
        password: "",
        code_tool: "",
        identificationNumber: "",
        role: RolesEnum.OPERADOR_TECNICO,
      },
    }),

  setSelectedUserId: (id) => set({ selectedUserId: id }),

  setRole: (role: RolesEnum) =>
    set((state) => ({
      formData: { ...state.formData, role },
    })),

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const data = await userService.getUsers();
      console.log("Usuarios obtenidos:", data);
      set({ users: data });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchUserById: async (identificationNumber) => {
    try {
      const data = await userService.getUserById(identificationNumber);

      const validRole = Object.values(RolesEnum).includes(data.role)
        ? data.role
        : RolesEnum.OPERADOR_TECNICO; // Valor por defecto

      set({
        selectedUser: data,
        selectedUserId: identificationNumber,
        editModalOpen: true,
        formData: { ...data, role: validRole },
      });
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  },

  updateUser: async (user) => {
    const validRole = Object.values(RolesEnum).includes(user.role)
      ? user.role
      : RolesEnum.OPERADOR_TECNICO;
    try {
      await userService.updateUser(user.identificationNumber, {
        ...user,
        role: validRole,
      });
      set({ editModalOpen: false, selectedUser: null, selectedUserId: null });
      await get().fetchUsers();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  },

  deleteUser: async (identificationNumber: number) => {
    try {
      await userService.deleteUser(identificationNumber, 0);
      await get().fetchUsers();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  },

  setEditModalOpen: (open) => set({ editModalOpen: open }),
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
