export interface ProductsSold {
  id?: number,
  productId?: number;
  name: string;
  quantity: number;
  price: number;
  wholesalePrice?: number | null;
  wholesaleMinimalQuantity?: number | null;
  total: number;
}

export interface SaleRelatory {
  id?: number;
  userId?: number;
  products?: ProductsSold[]
  totalValue?: number;
  firstPayment?: string;
  firstAmountPaid?: number;
  change?: number | null;
  balanceToPay?: number | null;
  secondPayment?: string | null;
  secondAmountPaid?: number | null;
  seller?: string;
  saleDate?: Date | null;
}