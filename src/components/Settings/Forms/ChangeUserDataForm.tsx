import { useUserData } from "../../../hooks/useUserData";
import { Input } from "../Input";
import { Button } from "../../Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const editUserFormSchema = yup.object({
  firstName: yup.string().required("Primeiro nome é necessário"),
  lastName: yup.string().required("Ultimo nome é necessário"),
  phoneNumber: yup.string().required("Telefone é necessário"),
  storeName: yup.string().required("Nome da loja é necessário"),
  beforePass: yup.string(),
  afterPass: yup.string(),
});

type EditUserFormSchema = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  storeName: string;
  beforePass?: string;
  afterPass?: string;
};

export const ChangeUserDataForm = () => {
  const { data } = useUserData();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(editUserFormSchema),
  });

  const handleChangeUser: SubmitHandler<EditUserFormSchema> = (data) => {
    console.log(data)
  };

  return (
    <form
      className="flex flex-1 flex-col w-full py-8 px-16 gap-4 justify-between"
      onSubmit={handleSubmit(handleChangeUser)}
    >
      <div className="flex flex-col gap-2">
        <Input
          defaultValue={data?.firstName}
          {...register("firstName")}
          error={errors.firstName}
        >
          Primeiro nome:
        </Input>
        <Input
          defaultValue={data?.lastName}
          {...register("lastName")}
          error={errors.lastName}
        >
          Ultimo nome:
        </Input>
        <Input
          defaultValue={data?.phoneNumber}
          {...register("phoneNumber")}
          error={errors.phoneNumber}
        >
          Telefone:
        </Input>
        <Input
          type="password"
          {...register("beforePass")}
          error={errors.beforePass}
        >
          Senha antiga:
        </Input>
        <Input
          type="password"
          {...register("afterPass")}
          error={errors.afterPass}
        >
          Senha nova:
        </Input>
      </div>
      <Button>Alterar Informações</Button>
    </form>
  );
};
