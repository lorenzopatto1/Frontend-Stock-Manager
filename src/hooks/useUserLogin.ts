import { api } from "../Data/api";

import Cookies from "js-cookie";
import { SignInFormData } from "../routes/Login";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LoginResponse {
  message: string;
  token: string;
}

const PostLogin = async (userLogin: SignInFormData) => {
  try {
    const response = await api.post<LoginResponse>("/Signin", userLogin);
    const { token } = response.data;
    Cookies.set("token", token, { expires: 7, path: "/" });
  } catch (_) {
    throw new Error('Erro ao fazer login')
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