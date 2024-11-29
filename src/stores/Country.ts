import create from "zustand";
import { City, Department } from "../interfaces/Country/country";

interface CountryState {
  country: (Department | City)[]; // Usa una unión de tipos
  setCountry: (country: (Department | City)[]) => void; // Define el tipo del setter
}

const useCountryStore = create<CountryState>((set) => ({
  country: [],
  setCountry: (newCountry) => set({ country: newCountry }),
}));

export default useCountryStore;
