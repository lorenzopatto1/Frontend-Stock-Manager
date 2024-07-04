import { useEffect, useState } from "react";
import { useCartProducts } from "../../context/CartProductsContext";
import { Input } from "../Input";
import PaymentOptions from "./PaymentOptions";

interface PaymentDataProps {
  secondPayment: string[];
}

export const PaymentData = ({ secondPayment }: PaymentDataProps) => {
  const { setSale, total } = useCartProducts();
  const [amountPayd, setAmountPayd] = useState(total.toString());
  const [secondOption, setSecondOption] = useState(
    "Escolha a forma de pagamento"
  );
  const [changeCheck, setChangeCheck] = useState(true);

  const cashChange = total - Number(amountPayd.replace(",", "."));

  useEffect(() => {
    setSale(prevState => ({ 
      ...prevState,
      totalValue: total,
      firstAmountPaid: Number(amountPayd),  
      change: changeCheck ? cashChange * -1 : 0,
      balanceToPay: secondOption !== "Escolha a forma de pagamento" && cashChange > 0 ? cashChange : 0,
      secondPayment: secondOption !== "Escolha a forma de pagamento" ? secondOption : null,
      secondAmountPaid: secondOption !== "Escolha a forma de pagamento" && cashChange > 0 ? cashChange : 0,
    }))
  }, [amountPayd, cashChange, changeCheck, secondOption, setSale, total])

  return (
    <>
      <Input
        className="block w-full rounded-md dark:bg-[#09090A] p-4 border-0 py-1.5 shadow-sm ring-2 ring-inset ring-zinc-500 placeholder:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 hover:ring-indigo-600 sm:text-sm sm:leading-6 selection:bg-indigo-600"
        value={amountPayd}
        onChange={(e) => setAmountPayd(e.target.value)}
        type="text"
      >
        Valor pago pelo cliente:
      </Input>
      {amountPayd !== "" && (
        <>
          {cashChange > 0 ? (
            <div className="flex flex-col mt-2 gap-4 dark:text-zinc-200 font-bold">
              <p className="text-lg">
                Ainda falta ser pago:{" "}
                <span className="text-red-700">
                  {cashChange.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
              <div>
                <p>
                   Será pago o restante ?
                </p>
                <PaymentOptions
                  selected={secondOption}
                  setSelected={setSecondOption}
                  paymentOptions={secondPayment}
                />
              </div>
            </div>
          ) : cashChange < 0 ? (
            <p className="text-lg flex-1 flex-col justify-center mt-16 flex gap-1 font-bold">

                <span className="text-zinc-600 dark:text-zinc-400 text-center text-xs">*Deixe desmarcado caso fique como gorjeta*</span>

              <div className="flex justify-center items-center gap-2">
                <span>Troco a ser devolvido:</span>
                <span className="text-orange-600 dark:text-orange-700">
                  {(cashChange * -1).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <input className="w-6 h-6 cursor-pointer appearance-none checked:appearance-auto ring-zinc-200 ring-1 checked:ring-0 bg-black dark:bg-gray-600 rounded-md text-red-500" checked={changeCheck} onChange={(e) => setChangeCheck(e.target.checked)} type="checkbox" />
              </div>
            </p>
          ) : (
            <p>Tudo certo! você pode finalizar a venda</p>
          )}
        </>
      )}
    </>
  );
};
