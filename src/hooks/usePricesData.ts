import { useQuery } from "@tanstack/react-query";
import { api } from "../Data/api";

import Cookies from 'js-cookie'
import { AxiosPromise } from "axios";
import { PricesResponse } from "../interfaces/product-data";

const getPrices = async (): AxiosPromise<PricesResponse[]> => {
  const token = Cookies.get('token');
  const response = await api.get<PricesResponse[]>("/Products/Prices", {
    params: {
      token
      }
      });
  return response;
  }

export function usePricesData ()
{
  const query = useQuery({
    queryFn: getPrices,
    queryKey: ['products-prices-data']
  });

  return {
    ...query,
    purchaseCost: query.data?.data,
  };
}