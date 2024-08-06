"use client"

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { inputsProps } from "../../data/productFormProps";
import { useCategorysData } from "../../hooks/useCategoryData";
import { useProductsByIdData } from "../../hooks/useProductByIdData";
import { useProductEditMutate } from "../../hooks/useProductEditMutate";
import { CreateProductFormData, ProductData } from "../../interfaces/product-data";
import { productFormSchema } from "../../schema/ProductFormSchema";
import { Button } from "../Button";
import { Input } from "../Input";
import Loading from "../Loading";
import { useDecimalFormat } from "../../hooks/useDecimalFormat";
import { ProductTypePopover } from "./ProductTypePopover";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  const { data, isSuccess: dataSuccess, refetch } = useProductsByIdData(id);
  const { data: categorys } = useCategorysData();
  const { mutate, isPending, isError: mutateError } = useProductEditMutate();

  const { formatter } = useDecimalFormat();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      percentual: "",
    },
  });

  const productType = searchParams.get("productType");

  useEffect(() => {
    (async () => {
      if (open) {
        await refetch();
        const calcPercentual =
          (Number(getValues().salePrice) / Number(getValues().purchasePrice)) *
          100 -
          100;

        setValue("percentual", calcPercentual > 0 ? formatter(calcPercentual) : '');
      } else {
        await refetch();
        reset();
      }
    })();
  }, [open, data]);

  const handleEditProduct: SubmitHandler<CreateProductFormData> = async (product) => {
    const dataMutate: ProductData = {
      ...product,
      id,
      type: Number(productType!),
      purchasePrice: Number(product.purchasePrice.toString().replace(",", ".")),
      salePrice: Number(product.salePrice.toString().replace(",", ".")),
      wholesaleUnityPrice: Number(
        product.wholesaleUnityPrice?.toString().replace(",", ".")
      ),
      validationDate:
        product.validationDate && new Date(product.validationDate),
    };

    mutate(dataMutate);
    if (!mutateError) {
      await refetch();
      handleClose();
      reset();
    }
  };

  const percentualChange = (event: ChangeEvent<HTMLInputElement>) => {
    const percentual = Number(event.target.value.replace(",", "."));
    const purchasePrice = Number(getValues().purchasePrice.replace(",", "."));
    const calcSalePrice = purchasePrice + purchasePrice * (percentual! / 100);

    setValue("salePrice", calcSalePrice > 0 ? formatter(calcSalePrice) : "");
  };

  const salePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const purchasePrice = Number(getValues().purchasePrice.replace(",", "."));
    const salePrice = Number(event.target.value.replace(",", "."));
    const calcPercentual = (salePrice / purchasePrice) * 100 - 100;
    setValue(
      "percentual",
      calcPercentual > 0 && calcPercentual !== Infinity
        ? formatter(calcPercentual)
        : ""
    );
  };

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
                        <DialogTitle className="text-xl flex justify-between font-bold leading-6">
                          Editar produto:
                          <ProductTypePopover defaultValue={data?.type} />
                        </DialogTitle>
                      </div>
                      <div className="relative mt-6 flex-1 flex gap-8 flex-col px-4 sm:px-6 w-full">
                        <form
                          autoComplete="new-password"
                          className="space-y-2 w-full"
                          onSubmit={handleSubmit(handleEditProduct)}
                        >
                          <Input
                            type="text"
                            className="hidden"
                            value={Number(productType!)}
                            {...register("type")}
                            error={errors.type}
                          />
                          {inputsProps.map((input, key) => (
                            <Input
                              key={key}
                              type={input.type}
                              {...register(input.name)}
                              error={errors.name}
                              defaultValue={
                                (data &&
                                  input.name !== "percentual" &&
                                  data[input.name]) ||
                                undefined
                              }
                              onChange={(e) => {
                                if (input.name === "percentual") {
                                  percentualChange(e);
                                }
                                if (input.name === "salePrice") {
                                  salePriceChange(e);
                                }
                              }}
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
                            defaultValue={
                              data?.validationDate?.toString().split("T")[0]
                            }
                          >
                            Data de validade do produto/lote:
                          </Input>
                          <Button disabled={isPending} type="submit">
                            {isPending ? <Loading /> : "Editar"}
                          </Button>
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
