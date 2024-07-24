import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { inputsProps } from "../../data/productFormProps";
import { useCategorysData } from "../../hooks/useCategoryData";
import { useProductCreateMutate } from "../../hooks/useProductCreateMutate";
import { CreateProductFormData, ProductData } from "../../interfaces/product-data";
import { productFormSchema } from "../../schema/ProductFormSchema";
import { Button } from "../Button";
import { Input } from "../Input";
import Loading from "../Loading";
import { ChangeEvent } from "react";
import { useDecimalFormat } from "../../hooks/useDecimalFormat";
import { ProductTypePopover } from "./ProductTypePopover";
import { useSearchParams } from "react-router-dom";

interface INewProductModal {
  open: boolean;
  handleClose: () => void;
}

export const NewProductModal = ({ open, handleClose }: INewProductModal) => {
  const { mutate, isPending, isError } = useProductCreateMutate();
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(productFormSchema) });
  const { data: categorys } = useCategorysData();
  const { formatter } = useDecimalFormat();
  const [searchParams] = useSearchParams();

  const productType = Number(searchParams.get("productType"));

  const handleCreateProduct: SubmitHandler<CreateProductFormData> = (
    product
  ) => {
    const data: ProductData = {
      ...product,
      type: productType,
      purchasePrice: Number(product.purchasePrice.toString().replace(",", ".")),
      salePrice: Number(product.salePrice.toString().replace(",", ".")),
      wholesaleUnityPrice: Number(
        product.wholesaleUnityPrice?.toString().replace(",", ".")
      ),
      validationDate:
        product.validationDate && new Date(product.validationDate),
    };
    mutate(data);

    if (!isError) {
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
    setValue("percentual", calcPercentual > 0 && calcPercentual !== Infinity ? formatter(calcPercentual) : "");
  };

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
                        className="relative rounded-md text-black dark:text-gray-300 hover:text-zinc-800 black:hover:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        onClick={handleClose}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <DialogTitle className="flex text-nowrap justify-between text-xl font-bold leading-6 items-center">
                        Cadastrar produto:
                        <ProductTypePopover />
                      </DialogTitle>
                    </div>
                    <div className="relative mt-6 flex-1 flex gap-8 flex-col px-4 sm:px-6 w-full">
                      <form
                        className="space-y-2 w-full"
                        onSubmit={handleSubmit(handleCreateProduct)}
                      >
                        <Input className="hidden" type="number" value={productType} error={errors.type} {...register("type")}/>
                        {inputsProps.map((input, key) => (
                          <Input
                            key={key}
                            type={input.type}
                            {...register(input.name)}
                            autoComplete="new-password"
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
                        >
                          Data de validade do produto/lote:
                        </Input>
                        <Button
                          type="submit"
                          disabled={isPending}
                        >
                          {isPending ? <Loading /> : "Criar produto"}
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
};
