import { IInOutFormData } from "../components/InOuts/Form";
import Cookies from "js-cookie";
import { api } from "../data/api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const registerInOuts = async (data: IInOutFormData) => {
  try {
    const establishment_Id = Cookies.get("establishment_Id");

    await api.post("/in-outs/register", {
      establishment_Id,
      ...data,
    });
    toast.success("Registrado com sucesso!");
  } catch (_) {
    toast.error("Falha ao registrar seus dados");
  }
};

export const useInOutsRegisterMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: registerInOuts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["in-outs-data"] });
    },
  });

  return mutate;
};
