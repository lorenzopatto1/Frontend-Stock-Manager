import { useQuery } from "@tanstack/react-query";
import { api } from "../data/api";

import Cookies from "js-cookie";
import { PricesResponse } from "../interfaces/product-data";
import { toast } from "sonner";

const getPrices = async () => {
  try {
    const establishment_Id = Cookies.get("establishment_Id");
    const response = await api.get<PricesResponse>(
      `/total/${establishment_Id}`
    );
    return response;
  } catch (_) {
    toast.error("Houve um problema ao encontrar os preços");
  }
};

export function usePricesData() {
  const query = useQuery({
    queryFn: getPrices,
    queryKey: ["products-prices-data"],
  });

  return {
    ...query,
    purchaseCost: query.data?.data,
  };
}
