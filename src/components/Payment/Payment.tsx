import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartProducts } from "../../context/CartProductsContext";
import { useRelatoryCreateMutate } from "../../hooks/useRelatoryCreateMutate";
import { Button } from "../Button";
import { PaymentData } from "./PaymentData";
import PaymentOptions from "./PaymentOptions";
import Loading from "../Loading";

const paymentOptions = [
  "Escolha a forma de pagamento",
  "Dinheiro",
  "Débito",
  "Crédito",
  "Pix",
];

const Payment = () => {
  const { mutate, isPending, isSuccess } = useRelatoryCreateMutate();
  const { sale, setSale, total, setProductsInCart } = useCartProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [firstPaymentOption, setFirstPaymentOption] = useState(
    paymentOptions[0]
  );

  useEffect(() => {
    setSale((prevState) => ({
      ...prevState,
      firstPayment: firstPaymentOption,
    }));

    return () => {
    };
    //eslint-disable-next-line
  }, [firstPaymentOption]);

  const finalize = searchParams.get("Finalize");

  const handleClose = () => {
    setSearchParams((state) => {
      state.delete("Finalize");
      return state;
    });
  };
  const handleFinishSale = () => {
    mutate(sale!);
  };

  if (isSuccess) {
    handleClose();
    setProductsInCart([]);
  }

  return (
    <Transition show={!!finalize}>
      <Dialog className="relative" onClose={handleClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center sm:p-0 ">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative max-w-[60%] lg:w-[60%] min-h-[80vh] flex flex-col items-center p-4 transform rounded-lg bg-white dark:bg-gray-950 text-left shadow-xl transition-all">
                <div className="dark:bg-gray-950 px-4 flex-1 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="md:text-2xl lg:text-3xl text-base text-nowrap font-semibold leading-6"
                    >
                      Total da compra:{" "}
                      <span className="text-green-700 dark:text-green-500">
                        {total.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </DialogTitle>
                    <div className="max-h-full">
                      <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl text-nowrap dark:text-zinc-300 mt-10">
                        Escolha a forma de pagamento:
                      </h2>
                      <PaymentOptions
                        selected={firstPaymentOption}
                        setSelected={setFirstPaymentOption}
                        paymentOptions={paymentOptions}
                      />

                      {paymentOptions[0] !== firstPaymentOption && (
                        <PaymentData
                          secondPayment={paymentOptions.filter(
                            (option) => option !== firstPaymentOption
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Button
                    disabled={
                      firstPaymentOption === paymentOptions[0] || isPending
                    }
                    onClick={handleFinishSale}
                    type="button"
                  >
                    {isPending ? <Loading /> : 'Finalizar venda'}
                  </Button>
                  <Link to="/cash-register">Voltar</Link>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Payment;
