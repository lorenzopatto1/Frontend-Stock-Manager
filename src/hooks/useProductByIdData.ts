import { useQuery } from "@tanstack/react-query";
import { api } from "../Data/api";

import Cookies from 'js-cookie'
import { AxiosPromise } from "axios";
import { ProductData } from "../interfaces/product-data";

const getProductById = async (id: number): AxiosPromise<ProductData> => {
  const token = Cookies.get('token');
  const response = await api.get<ProductData>(`/Products/${id}?token=${token}`, {params: {id}});
  return response;
  }

export function useProductsByIdData (id: number)
{
  const query = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ['products-by-id-data', id]
  });

  return {
    ...query,
    data: query.data?.data,
  };
}