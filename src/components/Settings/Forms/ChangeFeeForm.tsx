import { useUserData } from "../../../hooks/useUserData";
import { Input } from "../Input";
import { Button } from "../../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserEditMutate } from "../../../hooks/useUserEditMutate";

const editFeeFormSchema = yup.object({
  creditFee: yup.string().required(),
  debitFee: yup.string().required(),
  pixFee: yup.string().required()
});

type EditFeeFormSchema = {
  creditFee: string;
  debitFee: string;
  pixFee: string;
};

export const ChangeFeeDataForm = () => {
  const { data: userData } = useUserData();
  const { mutate } = useUserEditMutate();
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
    userData
      && mutate({
        ...userData,
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
          defaultValue={userData?.creditFee}
          {...register("creditFee")}
          error={errors.creditFee}
        >
          Taxa no crédito:
        </Input>
        <Input
          defaultValue={userData?.debitFee}
          {...register("debitFee")}
          error={errors.debitFee}
        >
          Taxa no débito:
        </Input>
        <Input
          defaultValue={userData?.pixFee}
          {...register("pixFee")}
          error={errors.pixFee}
        >
          Taxa no pix:
        </Input>
      </div>
      <Button>Alterar Informações</Button>
    </form>
  );
};
