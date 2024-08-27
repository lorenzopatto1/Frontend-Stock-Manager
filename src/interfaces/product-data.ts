import { Maybe } from "yup";

export enum ProductType {
  Unity = 1,
  Mix,
}

export interface ProductData {
  id?: string;
  establishment_Id?: string | null;
  type: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
  wholesaleMinimalQuantity: number | null;
  wholesaleUnityPrice: number | null;
  validationDate?: Date | null;
  category: string;
}

export interface PricesResponse {
  totalCost: number;
  totalSale: number;
}

export interface CreateProductFormData {
  type?: string;
  name: string;
  quantity: number;
  purchasePrice: string | number;
  percentual?: string;
  salePrice: string | number;
  wholesaleMinimalQuantity?: Maybe<number | undefined>;
  wholesaleUnityPrice?: Maybe<string | number | undefined>;
  validationDate?: Maybe<Date | undefined>;
  category: string;
}
