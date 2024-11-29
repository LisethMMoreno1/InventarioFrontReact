export interface LoginData {
    identificationNumber: string;
    password: string;
  }
  
export interface LoginResponse {
    token: string;
    user: {
      id: string;
      identificationNumber: string;
    };
  }