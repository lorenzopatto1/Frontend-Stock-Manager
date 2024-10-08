"use client"

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { Input } from "../../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/Button";
import { useUserLogin } from "../../hooks/useUserLogin";
import Loading from "../../components/Loading";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Head from "next/head";

export interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup
  .object()
  .shape({
    email: yup.string().required("Por favor, insira seu e-mail ou telefone"),
    password: yup.string().required("Por favor, insira sua senha"),
  })
  .required();

const Login = () => {
  const { mutate, isPending, isSuccess } = useUserLogin();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useRouter();

  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  useEffect(() => {
    if (token !== undefined) {
      navigate.push("/dashboard");
    }
  }, [isSuccess]);

  const handleSignIn: SubmitHandler<SignInFormData> = (userLogin) => {
    mutate(userLogin);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
      <Head>
        <title>Login</title>
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/icon.svg"
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
                type="email"
                error={errors.email}
                placeholder="Insira seu e-mail"
                {...register("email")}
              >
                E-mail
              </Input>
            </div>
          </div>

          <div>
            <div className="text-sm w-full text-end">
              <a
                href="#"
                className="font-semibold text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-500"
              >
                Esqueceu sua senha?
              </a>
            </div>
            <div className="relative flex flex-col justify-center -mt-5">
              <Input
                type={showPassword ? "text" : "password"}
                error={errors.password}
                placeholder="Insira sua senha"
                {...register("password")}
              >
                Senha
              </Input>
              {showPassword ? (<EyeIcon className="cursor-pointer right-2 bottom-1.5 absolute w-6" onClick={() => setShowPassword(!showPassword)} />) : (<EyeSlashIcon className="cursor-pointer right-2 bottom-1.5 absolute w-6" onClick={() => setShowPassword(!showPassword)} />)}
            </div>
          </div>

          <div>
            <Button disabled={watch().email === "" || watch().password === ""}>
              {isPending ? <Loading /> : "Fazer login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login