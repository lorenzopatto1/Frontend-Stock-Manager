import { useQuery } from "@tanstack/react-query";
import { api } from "../data/api";

import { AxiosPromise } from "axios";
import { ProductData } from "../interfaces/product-data";

export const getProductById = async (id: string): AxiosPromise<ProductData> => {
  const response = await api.get<ProductData>(`/products/unique/${id}`);
  return response;
};

export function useProductByIdData(id: string) {
  const query = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ["products-by-id-data", id],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
