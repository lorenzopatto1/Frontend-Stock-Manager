import { useQuery } from "@tanstack/react-query";
import { api } from "../Data/api";

import Cookies from 'js-cookie'
import { AxiosPromise } from "axios";
import { SaleRelatory } from "../interfaces/products-sold";

const getLog = async (): AxiosPromise<SaleRelatory[]> => {
  const token = Cookies.get('token');
  const response = await api.get<SaleRelatory[]>("/Relatory", {
    params: {
      token
    }
  });
  return response;
}

export function useLogData ()
{
  const query = useQuery({
    queryFn: getLog,
    queryKey: ['log-data']
  });
  
  return {
    ...query,
    data: query.data?.data,
    storeName: query.data?.data,
  };
}