import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../data/api";
import { toast } from "sonner";
import { IMachineFees } from "../interfaces/machine-fees";

const editFee = async (fees: IMachineFees) => {
  try {
    await api.put(`/machine-fees/update`, fees);
    toast.success("Alterações concluidas!");
  } catch (_) {
    toast.error("Erro nas alterações");
  }
};

export const useMachineFeesUpdateMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: editFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["machineFees-data"] });
    },
  });

  return mutate;
};
