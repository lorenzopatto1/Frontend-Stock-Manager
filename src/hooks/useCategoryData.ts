import { useQuery } from "@tanstack/react-query";
import { api } from "../data/api";

import Cookies from "js-cookie";
import { toast } from "sonner";

const getCategorys = async () => {
  try {
    const establishment_Id = Cookies.get("establishment_Id");
    const response = await api.get<string[]>(`/categorys/${establishment_Id}`);
    return response;
  } catch (_) {
    toast.error("Não foi possível encontrar as categorias");
  }
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
