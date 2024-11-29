export interface User {
    id?: number;
    typeOfIdentification: {
      name: string;
    };
    identificationNumber: string;
    firstName: string;
    middleName: string;
    firstLastName: string;
    secondLastName: string;
    phoneNumber: string;
    email: string;
    genre: {
      genre : string;
    };
    role: {
      typeOfRole: string;
    };
  }
  