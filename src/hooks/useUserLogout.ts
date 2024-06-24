import { api } from "../Data/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PostLogout = async () => {
  try {
    await api.post("Signout");
  } catch (_) {
    throw new Error("Falha ao sair da sua conta");
  }
};

export function useUserLogout ()
{
  const queryClient = useQueryClient(); 
  const mutation = useMutation({
    mutationFn: PostLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] })
    }
  });
  
  return mutation;
}