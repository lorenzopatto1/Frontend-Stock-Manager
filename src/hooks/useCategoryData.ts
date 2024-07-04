import { useQuery } from "@tanstack/react-query";
import { api } from "../data/api";

import Cookies from "js-cookie";
import { toast } from "sonner";

const getCategorys = async () => {
  try {
    const token = Cookies.get("token");
    const response = await api.get<string[]>(`/Products/Categorys?token=${token}`);
    return response;
  } catch (_) {
    toast.error("Não foi possível encontrar as categorias")
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
