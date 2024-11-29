export interface ProductIList {
  id: number;
  nameofProduct: string;
  description: string;
  price: number;
  quantityAvailable: number;
  category:   {
    categoryName:  string;
  }
}
