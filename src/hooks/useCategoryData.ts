import { useQuery } from "@tanstack/react-query";
import { api } from "../Data/api";

import Cookies from "js-cookie";
import { AxiosPromise } from "axios";

const getCategorys = async (): AxiosPromise<string[]> => {
  const token = Cookies.get("token");
  const response = await api.get<string[]>(`/Products/Categorys?token=${token}`);
  return response;
};

export function useCategorysData() {
  const query = useQuery({
    queryFn: () => getCategorys(),
    queryKey: ["categorys-data"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
