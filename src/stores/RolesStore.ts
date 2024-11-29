import create from "zustand";
import { RolesInter } from "../interfaces/Rol/rol";

interface RolesState {
  roles: RolesInter[];
  setRoles: (roles: RolesInter[]) => void;
}

const useRolesStore = create<RolesState>((set) => ({
  roles: [],
  setRoles: (newRoles) => set({ roles: newRoles }),
}));

export default useRolesStore;
