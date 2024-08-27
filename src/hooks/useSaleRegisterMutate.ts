import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../data/api";
import Cookies from "js-cookie";
import { SaleRelatory } from "../interfaces/products-sold";
import { toast } from "sonner";

const postSale = async (data: SaleRelatory) => {
  try {
    const establishment_Id = Cookies.get("establishment_Id");
    await api.post(`/sales/create`, {
      establishment_Id,
      ...data,
    });
    toast.success("Venda concluida");
  } catch (_) {
    toast.error("Erro na venda");
  }
};

export const useSaleRegisterMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-data"] });
      queryClient.invalidateQueries({ queryKey: ["products-prices-data"] });
      queryClient.invalidateQueries({ queryKey: ["categorys-data"] });
    },
  });

  return mutate;
};
