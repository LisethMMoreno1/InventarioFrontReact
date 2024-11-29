import create from 'zustand';
import { User } from '../interfaces/Users/User'; 

interface State {
  users: User[];
  setUsers: (users: User[]) => void;
}

const useStore = create<State>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));

export default useStore;
