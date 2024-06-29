import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useSearchParams } from "react-router-dom";
import { useCartProducts } from "../../Context/CartProductsContext";

interface ChangeProps {
  input?: string;
  value?: string;
}

export const SaleData = () => {
  const { productsInCart, productFocus, setProductFocus, total } =
    useCartProducts();
  const [, setSearchParams] = useSearchParams();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const totalItem = Number(quantity) * Number(price);

  useEffect(() => {
    setSearchParams((state) => {
      if (productFocus) {
        setQuantity(productFocus.quantity.toString());
        setPrice(productFocus.price.toString());

        state.set("Quantity", productFocus.quantity.toString());
        state.set("Price", productFocus.price.toString());
        state.set("TotalItem", productFocus.total.toString());
      } else {
        setPrice("0");
        setQuantity("0");

        state.delete("Quantity");
        state.delete("Price");
        state.delete("TotalItem");
      }
      return state;
    });
    //eslint-disable-next-line
  }, [productFocus]);

  const handleChangeParams = ({ input, value }: ChangeProps) => {
    setSearchParams((state) => {
      if (input === "quantity" && value && value.length >= 1) {
        state.set("Quantity", value);
        state.set("TotalItem", totalItem.toString());
      } else if (value && value.length < 1 && !productFocus) {
        state.delete("Quantity");
        state.delete("TotalItem");
      }

      if (input === "price" && value && value.length >= 1) {
        state.set("Price", value);
        state.set("TotalItem", totalItem.toString());
      } else if (value && value.length < 1 && !productFocus) {
        state.delete("Price");
        state.delete("TotalItem");
      }
      if (input === "end") {
        state.set("Finalize", "true");
      } else {
        state.delete("Finalize");
      }

      return state;
    });
  };

  const handleFinishSale = () => {
    setProductFocus(undefined);

    // setSale(prevState => ({
    //   ...prevState,
    //   products: productsInCart
    // }))

    setSearchParams((state) => {
      state.delete("Quantity");
      state.delete("Price");
      state.delete("TotalItem");
      return state;
    });

    handleChangeParams({ input: "end" });
  };

  return (
    <form className="flex gap-4 w-full pt-10 h-[120px] items-center">
      <Input
        value={quantity}
        onChange={(e) => {
          {
            handleChangeParams({ input: "quantity", value: e.target.value });
            setQuantity(e.target.value);
          }
        }}
        type="number"
      >
        Quantidade
      </Input>

      <Input
        value={price}
        onChange={(e) => {
          {
            handleChangeParams({ input: "price", value: e.target.value });
            setPrice(e.target.value);
          }
        }}
        type="text"
      >
        Preço
      </Input>

      <div className="flex-1 transition-all text-xs md:text-sm lg:text-base p-3 group w-[12%] hover:ring-indigo-500 focus-within:ring-indigo-500 flex ring-1 rounded-lg ring-zinc-500 relative flex-col">
        <div className="font-bold rounded-md text-nowrap absolute group-focus-within:text-indigo-500 -top-4 px-1 md:px-2 bg-gray-900">
          Total Item
        </div>
        <p className="font-bold ring-1  group-hover:ring-indigo-500 ring-zinc-500 w-full text-center py-4 md:text-start md:p-4 rounded-md">
          {productFocus
            ? totalItem.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })
            : 0}
        </p>
      </div>

      <div className="flex-1 transition-all text-xs md:text-sm lg:text-base group w-[12%] hover:ring-indigo-500 focus-within:ring-indigo-500 flex ring-1 rounded-lg ring-zinc-500 p-3 relative flex-col">
        <div className="font-bold rounded-md absolute text-nowrap group-focus-within:text-indigo-500 -top-4 px-2 bg-gray-900">
          Total
        </div>
        <p className="font-bold ring-1  group-hover:ring-indigo-500 ring-zinc-500 w-full text-center py-4 md:text-start md:p-4 rounded-md">
          {productFocus
            ? total.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })
            : 0}
        </p>
      </div>

      <button
        type="button"
        disabled={productsInCart.length > 0 ? false : true}
        onClick={handleFinishSale}
        className="disabled:hover:ring-zinc-500 text-xs md:text-sm lg:text-base disabled:hover:text-zinc-200 flex flex-1 items-center justify-center py-3 md:p-3 text-nowrap h-16 focus:outline-none focus:ring-indigo-700 focus:text-indigo-700 rounded-md ring-1 ring-zinc-500 hover:text-indigo-700 hover:ring-indigo-700 font-bold transition-all"
      >
        Finalizar venda
      </button>
    </form>
  );
};
