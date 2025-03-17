export interface UserStore {
  users: User[];
  selectedUser: User | null;
  selectedUserId: number | null;
  editModalOpen: boolean;
  loading: boolean;
  formData: UserFormData;
  setFormData: (data: Partial<UserFormData>) => void;
  resetForm: (data?: UserFormData) => void;
  setSelectedUserId: (id: number | null) => void;
  fetchUsers: () => Promise<void>;
  fetchUserById: (identificationNumber: number) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (identificationNumber: number) => Promise<void>;
  setEditModalOpen: (open: boolean) => void;
  setSelectedUser: (user: User | null) => void;
  setRole: (role: RolesEnum) => void;
}
