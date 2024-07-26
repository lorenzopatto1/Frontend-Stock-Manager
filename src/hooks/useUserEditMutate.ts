import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../data/api";
import Cookies from "js-cookie";
import { UserData } from "../interfaces/user-data";
import { toast } from "sonner";

const editUser = async (user: UserData) => {
  try {
    const token = Cookies.get("token");
    await api.put(`/User/?token=${token}`, user);
    toast.success("Alterações concluidas!");
  } catch (_) {
    toast.error("Erro nas alterações");
  }
};

export const useUserEditMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });

  return mutate;
};
