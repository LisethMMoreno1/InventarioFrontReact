import create from "zustand";
import { GenreInter } from "../interfaces/typeOfGenders/typeOfGenders";

interface TypeOfGenderState {
  genreInter: GenreInter[];
  setGenreInter: (genreInter: GenreInter[]) => void;
}

const useTypeOfGenderStore = create<TypeOfGenderState>((set) => ({
  genreInter: [],
  setGenreInter: (newGenreInter) => set({ genreInter: newGenreInter }),
}));

export default useTypeOfGenderStore;
