export interface ProductsSold {
  id?: string;
  product_Id?: string;
  type: string;
  name: string;
  category: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
  total: number;
}

export interface SaleRelatory {
  id?: string;
  establishment_Id?: number;
  totalPurchaseValue: number | null;
  totalSaleValue: number;
  firstPayment: string | null;
  firstAmountPaid: number | null;
  change?: number;
  balanceToPay?: number | null;
  secondPayment?: string;
  secondAmountPaid?: number;
  saleDate?: Date | null;
  products: ProductsSold[];
}
