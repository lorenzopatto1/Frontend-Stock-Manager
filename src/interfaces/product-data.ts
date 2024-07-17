import { Maybe } from "yup";

export enum ProductType {
  Unity = 1,
  Mix
}

export interface ProductData {
  id?: number;
  type: ProductType;
  name: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
  wholesaleMinimalQuantity?: number | null;
  wholesaleUnityPrice?: number | null;
  validationDate?: Date | null;
  group: string;
  userId?: number | null;
}

export interface PricesResponse {
    type: ProductType;
    quantity: number;
    purchasePrice: number;
    salePrice: number;
}

export interface CreateProductFormData {
  type: ProductType;
  name: string;
  quantity: number;
  purchasePrice: string | number;
  percentual?: string;
  salePrice: string | number;
  wholesaleMinimalQuantity?: Maybe<number | undefined>;
  wholesaleUnityPrice?: Maybe<string | number | undefined>;
  validationDate?: Maybe<Date | undefined>;
  group: string;
}
