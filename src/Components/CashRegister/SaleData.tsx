import { ProductsSold } from "../../interfaces/products-sold";
import { Input } from "./Input";

interface SaleDataProps {
  productFocus: ProductsSold | undefined;
  total: number;
}

export const SaleData = ({ productFocus, total }: SaleDataProps) => {
  return (
    <form className="flex justify-between w-full pt-10">
      <Input defaultValue={productFocus?.quantity} type="number">
        Quantidade
      </Input>

      <Input defaultValue={productFocus?.price} type="text">
        Preço
      </Input>

      <Input defaultValue={productFocus?.total} type="text">
        Total item
      </Input>

      <div className="transition-all group w-[12%] focus-within:ring-indigo-500 flex ring-1 rounded-lg ring-zinc-500 p-3 relative flex-col">
        <div className="font-bold rounded-md absolute group-focus-within:text-indigo-500 -top-4 px-2 bg-gray-900">
          Total
        </div>
        <p className="ring-1 ring-zinc-500 p-4 rounded-md">
          {total.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      <div className="flex items-center p-3">
        <button className="focus:outline-none focus:ring-indigo-700 focus:text-indigo-700 p-4 rounded-md ring-1 ring-zinc-500 hover:text-indigo-700 hover:ring-indigo-700 font-bold">
          Finalizar venda
        </button>
      </div>
    </form>
  );
};
