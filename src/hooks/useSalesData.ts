import { useQuery } from "@tanstack/react-query";
import { api } from "../data/api";

import Cookies from "js-cookie";
import { AxiosPromise } from "axios";
import { SaleRelatory } from "../interfaces/products-sold";

const getSales = async (): AxiosPromise<SaleRelatory[]> => {
  const establishment_Id = Cookies.get("establishment_Id");
  const response = await api.get<SaleRelatory[]>(
    `/sales/all/${establishment_Id}`
  );
  return response;
};

export function useSalesData() {
  const query = useQuery({
    queryFn: getSales,
    queryKey: ["log-data"],
  });

  return {
    ...query,
    data: query.data?.data,
    storeName: query.data?.data,
  };
}
