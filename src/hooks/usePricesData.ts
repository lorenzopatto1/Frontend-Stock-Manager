import { useQuery } from "@tanstack/react-query";
import { api } from "../Data/api";

import Cookies from 'js-cookie'
import { PricesResponse } from "../interfaces/product-data";
import { toast } from "sonner";

const getPrices = async () => {
  try {
    const token = Cookies.get('token');
  const response = await api.get<PricesResponse[]>("/Products/Prices", {
    params: {
      token
      }
      });
  return response;
  } catch (_) {
    toast.error("Houve um problema ao encontrar os preços")
  }
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