import { Maybe } from "yup";

export interface ProductData {
  id?: number;
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
    quantity: number;
    purchasePrice: number;
    salePrice: number;
}

export interface CreateProductFormData {
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
