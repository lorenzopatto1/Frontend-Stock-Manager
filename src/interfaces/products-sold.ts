export interface ProductsSold {
  id: number,
  name: string;
  quantity: number;
  price: number;
  wholesalePrice: number | null;
  wholesaleMinimalQuantity: number | null;
  total: number;
}