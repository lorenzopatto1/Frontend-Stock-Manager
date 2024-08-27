import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductData } from "../interfaces/product-data";
import { api } from "../data/api";
import { toast } from "sonner";

const editProduct = async (data: ProductData) => {
  try {
    await api.put(`/products/update`, data);
    toast.success("Produto editado!");
  } catch (_) {
    toast.error("Falha ao editar produto");
  }
};

export const useProductEditMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-data"] });
      queryClient.invalidateQueries({ queryKey: ["products-prices-data"] });
      queryClient.invalidateQueries({ queryKey: ["categorys-data"] });
    },
  });

  return mutate;
};
