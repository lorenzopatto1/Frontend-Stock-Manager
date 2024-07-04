import { api } from "../data/api";

import Cookies from "js-cookie";
import { SignInFormData } from "../routes/Login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface LoginResponse {
  message: string;
  token: string;
}

const PostLogin = async (userLogin: SignInFormData) => {
  try {
    const response = await api.post<LoginResponse>("/Signin", userLogin);
    const { token } = response.data;
    toast.success("Usuário logado!");
    Cookies.set("token", token, { expires: 7, path: "/" });
  } catch (_) {
    toast.error("Falha na autenticação");
  }
}

export function useUserLogin ()
{
  const queryClient = useQueryClient(); 
  const mutation = useMutation({
    mutationFn: PostLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] })
    }
  });
  
  return mutation;
}