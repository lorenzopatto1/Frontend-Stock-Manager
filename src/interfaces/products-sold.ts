import { ProductType } from "./product-data";

export interface ProductsSold {
  id?: number,
  productId?: number;
  type: ProductType;
  name: string;
  quantity: number;
  purchasePrice: number;
  price: number;
  wholesalePrice?: number | null;
  wholesaleMinimalQuantity?: number | null;
  total: number;
}

export interface SaleRelatory {
  id?: number;
  totalCost?: number;
  totalValue?: number;
  firstPayment?: string;
  firstAmountPaid?: number;
  change?: number | null;
  balanceToPay?: number | null;
  secondPayment?: string | null;
  secondAmountPaid?: number | null;
  seller?: string;
  saleDate?: Date | null;
  userId?: number;
  products?: ProductsSold[]
}