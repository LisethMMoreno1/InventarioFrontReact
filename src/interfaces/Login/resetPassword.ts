export interface resetPasswordData {
    identificationNumber: string;
  
  }

  export interface ResetPasswordResponse {
    token: string;
    user: {
      id: string;
      identificationNumber: string;
    };
  }