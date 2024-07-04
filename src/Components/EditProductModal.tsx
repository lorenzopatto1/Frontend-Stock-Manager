import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { inputsProps } from "../data/productFormProps";
import { productFormSchema } from "../schema/ProductFormSchema";
import { useCategorysData } from "../hooks/useCategoryData";
import { useProductsByIdData } from "../hooks/useProductByIdData";
import { useProductEditMutate } from "../hooks/useProductEditMutate";
import { CreateProductFormData } from "../interfaces/product-data";
import { Button } from "./Button";
import { Input } from "./Input";
interface INewProductModal {
  open: boolean;
  handleClose: () => void;
  id: number;
}

export const EditProductModal = ({
  open,
  handleClose,
  id,
}: INewProductModal) => {
  const { data, isSuccess: dataSuccess, refetch } = useProductsByIdData(id);
  const { data: categorys } = useCategorysData();
  const { mutate, isSuccess: mutateSuccess } = useProductEditMutate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productFormSchema),
  });

  useEffect(() => {
    (async () => {
      if (open) {
        await refetch();
        reset();
      }
    })();
    //eslint-disable-next-line
  }, [open]);

  const handleEditProduct: SubmitHandler<CreateProductFormData> = (product) => {
    const dataMutate = {
      ...product,
      id,
      purchasePrice: Number(product.purchasePrice.toString().replace(",", ".")),
      salePrice: Number(product.salePrice.toString().replace(",", ".")),
      wholesaleUnityPrice: Number(
        product.wholesaleUnityPrice?.toString().replace(",", ".")
      ),
      validationDate:
        product.validationDate && new Date(product.validationDate),
    };

    mutate(dataMutate);
    
    if (mutateSuccess) {
      handleClose();
      reset();
    }
  };

  // const percentualChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setPercentual(event.target.value);
  //   setSalePrice(Number(purchasePrice) + purchasePrice * (event.target.value / 100));
  // }

  // const salePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSalePrice(event.target.value)
  //   setPercentual(event.target.value / purchasePrice * 100 - 100);
  //   console.log((salePrice / purchasePrice) * 100 - 100)
  // }
  if (dataSuccess) {
    return (
      <Transition show={open}>
        <Dialog className="relative z-10" onClose={handleClose}>
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto relative w-screen max-w-md">
                    <TransitionChild
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={handleClose}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Fechar</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </TransitionChild>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <DialogTitle className="text-xl font-bold leading-6">
                          Editar produto: {data?.name}
                        </DialogTitle>
                      </div>
                      <div className="relative mt-6 flex-1 flex gap-8 flex-col px-4 sm:px-6 w-full">
                        <form
                          autoComplete="new-password"
                          className="space-y-2 w-full"
                          onSubmit={handleSubmit(handleEditProduct)}
                        >
                          {inputsProps.map((input, key) => (
                            <Input
                              key={key}
                              type={input.type}
                              {...register(input.name)}
                              error={errors.name}
                              defaultValue={data && data[input.name] || undefined}
                            >
                              {input.label}
                            </Input>
                          ))}
                          <Input
                            type="text"
                            error={errors.group}
                            {...register("group")}
                            list="categorys"
                            defaultValue={data?.group}
                          >
                            Categoria:
                          </Input>
                          <datalist id="categorys">
                            {categorys?.map((category) => (
                              <option key={category}>{category}</option>
                            ))}
                          </datalist>
                          <Input
                            type="date"
                            error={errors.validationDate}
                            {...register("validationDate")}
                            defaultValue={data?.validationDate?.toString().split('T')[0]}
                          >
                            Data de validade do produto/lote:
                          </Input>
                          <Button>Editar</Button>
                        </form>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
};
