"use client"

import React from 'react'
import { Input } from '../Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useInOutsRegisterMutate } from '../../hooks/useInOutsRegisterMutate';

const registerInOutSchema = yup.object({
  value: yup.number().typeError("Por favor, insira um número válido").min(0).required("Este campo é obrigatório"),
  date: yup.date().typeError("Por favor, insira uma data válida").required("Este campo é obrigatório"),
  description: yup.string().min(5, "Insira um minímo de 5 caracteres").required("Este campo é obrigatório"),
  type: yup.string().required("Este campo é obrigatório")
})

export interface IInOutFormData {
  value: number;
  date: Date;
  description: string;
  type: string;
}

export const Form = () => {
  const { mutate, isPending } = useInOutsRegisterMutate();
  const {
    handleSubmit, register, formState: { errors }, reset
  } = useForm({
    resolver: yupResolver(registerInOutSchema)
  })

  const handleRegisterInOut = (data: IInOutFormData) => {
    mutate(data);

    reset()
  }

  return (
    <form className="flex p-8 rounded-md flex-col gap-4 bg-gray-300 dark:bg-gray-800" onSubmit={handleSubmit(handleRegisterInOut)}>
      <Input placeholder="R$ 00,00" {...register("value")} error={errors.value}>Valor:</Input>
      <Input type="date" {...register("date")} error={errors.date}>Data:</Input>
      <Input placeholder="Exemplo: Conta de luz" {...register("description")} error={errors.description}>Descrição:</Input>
      <div className="flex my-3 text-base justify-around">
        <div className="flex gap-2 items-center">
          Entrada:
          <Input className="appearance-none w-6 h-6 bg-transparent transition-all ring-2 ring-black dark:ring-gray-400 checked:ring-indigo-500 dark:checked:ring-indigo-500 cursor-pointer hover:ring-indigo-500 dark:hover:ring-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500 rounded-full checked:border-transparent focus:outline-none relative" type="radio" value="In" {...register("type")} error={errors.type} />
        </div>
        <div className="flex gap-2 items-center">
          Saída:
          <Input className="appearance-none w-6 h-6 bg-transparent transition-all ring-2 ring-black dark:ring-gray-400 checked:ring-indigo-500 dark:checked:ring-indigo-500 cursor-pointer hover:ring-indigo-500 dark:hover:ring-indigo-500 focus:ring-indigo-500 dark:focus:ring-indigo-500 rounded-full checked:border-transparent    focus:outline-none relative" type="radio" defaultChecked={true} value="Out" {...register("type")} error={errors.type} />
        </div>
      </div>
      <button className="mt-2 ring-1 text-base p-2 rounded-md ring-indigo-500 focus:ring-2 focus:outline-none hover:bg-indigo-500 transition-colors" disabled={isPending}>Registrar</button>
    </form>
  )
}
