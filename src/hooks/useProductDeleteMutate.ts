import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../data/api";
import { toast } from "sonner";

const deleteProduct = async (id: string) => {
  try {
    await api.delete(`/products/delete/${id}`);
    toast.success("Produto removido!");
  } catch (_) {
    toast.error("Falha ao remover produto");
  }
};

export const useProductDeleteMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-data"] });
      queryClient.invalidateQueries({ queryKey: ["products-prices-data"] });
      queryClient.invalidateQueries({ queryKey: ["categorys-data"] });
    },
  });

  return mutate;
};
