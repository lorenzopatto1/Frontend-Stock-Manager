export interface ProductsSold {
  id: number,
  name: string;
  quantity: number;
  price: number;
  wholesalePrice: number | null;
  wholesaleMinimalQuantity: number | null;
  total: number;
}

export interface SaleRelatory {
  id: number;
  userId: number;
  products: ProductsSold[]
  totalValue: number;
  firstPayment: string;
  firstAmountPaid: number;
  change?: number;
  balanceToPay?: number;
  secondPayment?: string;
  secondAmountPaid?: number;
  seller: string;
  saleDate: Date;
}