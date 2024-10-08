"use client"

import { useMachineFeesData } from "../../../hooks/useMachineFeesData";
import { Input } from "../Input";
import { Button } from "../../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMachineFeesUpdateMutate } from "../../../hooks/useMachineFeesUpdateMutate";
import Loading from "../../Loading";

const editFeeFormSchema = yup.object({
  creditFee: yup.string().required("a taxa de crédito não pode ficar vazia: 0"),
  debitFee: yup.string().required("a taxa de débito não pode ficar vazia: 0"),
  pixFee: yup.string().required("a taxa de pix não pode ficar vazia: 0")
});

type EditFeeFormSchema = {
  creditFee: string;
  debitFee: string;
  pixFee: string;
};

export const ChangeFeeDataForm = () => {
  const { data: machineFees } = useMachineFeesData();
  const { mutate, isPending } = useMachineFeesUpdateMutate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(editFeeFormSchema),
  });

  const handleChangeFee: SubmitHandler<EditFeeFormSchema> = (fee) => {
    const data = {
      creditFee: Number(fee.creditFee.replace(",", ".")),
      debitFee: Number(fee.debitFee.replace(",", ".")),
      pixFee: Number(fee.pixFee.replace(",", "."))
    }
    machineFees
      && mutate({
        ...machineFees,
        ...data
      })
  };

  return (
    <form
      className="flex flex-col flex-1 w-full py-8 px-16 gap-4 justify-between"
      onSubmit={handleSubmit(handleChangeFee)}
    >
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Deixe o valor padrão como 0"
          defaultValue={machineFees?.creditFee}
          {...register("creditFee")}
          error={errors.creditFee}
        >
          Taxa no crédito:
        </Input>
        <Input
          placeholder="Deixe o valor padrão como 0"
          defaultValue={machineFees?.debitFee}
          {...register("debitFee")}
          error={errors.debitFee}
        >
          Taxa no débito:
        </Input>
        <Input
          placeholder="Deixe o valor padrão como 0"
          defaultValue={machineFees?.pixFee}
          {...register("pixFee")}
          error={errors.pixFee}
        >
          Taxa no pix:
        </Input>
      </div>
      <Button disabled={isPending}>{isPending ? <Loading /> : 'Alterar Informações'}</Button>
    </form>
  );
};
