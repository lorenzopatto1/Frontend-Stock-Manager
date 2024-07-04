import { useQuery } from "@tanstack/react-query";
import { api } from "../data/api";

import Cookies from 'js-cookie'
import { ProductData } from "../interfaces/product-data";
import { toast } from "sonner";

export const getProducts = async () => {
  try {
    const token = Cookies.get('token');
    const response = await api.get<ProductData[]>("/Products", {
      params: {
        token
        }
        });
        
        return response;
      } catch (_) {
        toast.error("Houve um problema ao encontrar seus produtos");
      }
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