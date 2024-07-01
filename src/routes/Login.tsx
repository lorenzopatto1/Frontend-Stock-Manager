import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { Input } from "../Components/Input";
import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../Components/Button";
import { useUserLogin } from "../hooks/useUserLogin";
import Loading from "../Components/Loading";

export interface SignInFormData {
  login: string;
  password: string;
}

const signInFormSchema = yup
  .object()
  .shape({
    login: yup.string().required("Por favor, insira seu e-mail ou telefone"),
    password: yup.string().required("Por favor, insira sua senha"),
  })
  .required();

export const Login = () => {
  const { mutate, isPending, isSuccess, isError } = useUserLogin();
  const navigate = useNavigate();

  if (isError) {
    toast.error("Falha na autenticação")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token !== undefined && isSuccess) {
      navigate("/home");
    }
  }, [navigate, isSuccess]);

  const handleSignIn: SubmitHandler<SignInFormData> = async (userLogin) => {
    mutate(userLogin);
    toast.success("Usuário logado!")
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight">
          Fazer login
        </h2>
      </div>

      <div className="mt-10  sm:mx-auto w-9/12 sm:max-w-sm">
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
          <div>
            <div className="mt-2">
              <Input
                type="text"
                error={errors.login}
                placeholder="Insira seu e-mail ou Numero de telefone"
                {...register("login")}
              >
                E-mail ou Telefone
              </Input>
            </div>
          </div>

          <div>
            <div className="text-sm w-full text-end">
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Esqueceu sua senha?
              </a>
            </div>
            <div className="-mt-5">
              <Input
                type="password"
                error={errors.password}
                placeholder="Insira sua senha"
                {...register("password")}
              >
                Senha
              </Input>
            </div>
          </div>

          <div>
            <Button>
              {isPending ? (
                <Loading />
              ) : (
                "Fazer login"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
