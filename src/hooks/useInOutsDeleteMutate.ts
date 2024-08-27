import { api } from "../data/api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteInOuts = async (id: string) => {
  try {
    await api.delete(`/in-outs/delete/${id}`);
    toast.success("Removido com sucesso!");
  } catch (_) {
    toast.error("Falha ao remover");
  }
};

export const useInOutsDeleteMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteInOuts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["in-outs-data"] });
    },
  });

  return mutate;
};
