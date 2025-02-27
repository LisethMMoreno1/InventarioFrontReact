export interface User {
  id_user: number;
  identificationNumber: number;
  name: string;
  email: string;
  password?: string;
  typeOfGender: number;
  typeOfIdentification: number;
  state: boolean;
  accessToken?: string;
  created_at: Date;
  updated_at: Date;
  role: number;
  roleModule?: number;
}
