import create from 'zustand';
import { typeOfIdentification } from '../interfaces/typeOfIdentification/typeOfIdentification';

interface TypeOfIdentificationState {
  typeOfIdentification: typeOfIdentification[];
  setTypeOfIdentifications: (typeOfIdentifications: typeOfIdentification[]) => void;
}

const useTypeOfIdentificationStore = create<TypeOfIdentificationState>((set) => ({
  typeOfIdentification: [],
  setTypeOfIdentifications: (typeOfIdentifications) => set({ typeOfIdentification: typeOfIdentifications }),
}));

export default useTypeOfIdentificationStore;
