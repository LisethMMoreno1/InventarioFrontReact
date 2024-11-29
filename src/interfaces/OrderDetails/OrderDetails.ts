export interface OrderDetails {
    id: number;
    brand: string;
    yearOfManufacture: number;
    plateNumber: string;
    descriptionOfProblem: string;
    categories: number[];
    subcategories: number[];
    orderStatusId: number;
    orderId: number;
    dateOfEntry?: Date;
  }
  