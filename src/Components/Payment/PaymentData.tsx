import { useState } from "react";
import { Input } from "../Input";
import { useCartProducts } from "../../Context/CartProductsContext";
import PaymentOptions from "./PaymentOptions";

interface PaymentDataProps {
  secondPayment: string[]
}

export const PaymentData = ({ secondPayment }: PaymentDataProps) => {
  const [amountPayd, setAmountPayd] = useState("");
  const [secondOption, setSecondOption] = useState("Escolha a forma de pagamento");
  const { total } = useCartProducts();

  const cashChange = total - Number(amountPayd.replace(",", "."));

  return (
    <>
      <Input
        className="block w-full rounded-md bg-[#09090A] p-4 border-0 py-1.5 shadow-sm ring-1 ring-inset ring-zinc-500 placeholder:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 hover:ring-indigo-600 sm:text-sm sm:leading-6 selection:bg-indigo-600"
        value={amountPayd}
        onChange={(e) => setAmountPayd(e.target.value)}
        type="text"
      >
        Valor pago pelo cliente:
      </Input>
      {amountPayd !== "" && (
        <>
          {cashChange > 0 ? (
            <div className="flex flex-col mt-2 gap-4 text-zinc-200 font-bold">
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
              <p className="text-xl text-zinc-300 mt-4 font-normal">Como será pago o restante?</p>
                <PaymentOptions selected={secondOption} setSelected={setSecondOption} paymentOptions={secondPayment} />
              </div>
            </div>
          ) : (
            cashChange < 0 && (
              <p className="text-lg mt-2 font-bold">
                Troco a ser devolvido:{" "}
                <span className="text-orange-700">
                  {(cashChange * -1).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </p>
            )
          )}
        </>
      )}
    </>
  );
};
