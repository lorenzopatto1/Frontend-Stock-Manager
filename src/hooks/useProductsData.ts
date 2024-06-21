import { useQuery } from "@tanstack/react-query";
import { api } from "../Data/api";

import Cookies from 'js-cookie'
import { AxiosPromise } from "axios";
import { ProductData } from "../interfaces/product-data";

export const getProducts = async (): AxiosPromise<ProductData[]> => {
  const token = Cookies.get('token');
  const response = await api.get<ProductData[]>("/Products", {
    params: {
      token
      }
      });
  return response;
  }

export function useProductsData ()
{
  const query = useQuery({
    queryFn: getProducts,
    queryKey: ['products-data']
  });

  return {
    ...query,
    data: query.data?.data,
    count: query.data?.data.reduce((acc, product) => (acc += product.quantity), 0)
  };
}