"use client"

import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useCartProducts } from "../../context/CartProductsContext";
import { useRouter } from "next/router";

export const SaleData = () => {
  const { setSale, productsInCart, setProductsInCart, productFocus, setProductFocus, total } =
    useCartProducts();
  const router = useRouter();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalItem, setTotalItem] = useState("");

  useEffect(() => {
    if (productFocus) {
      setQuantity(productFocus.quantity.toString());
      if (productFocus.wholesaleMinimalQuantity && productFocus.wholesalePrice && Number(quantity) >= productFocus.wholesaleMinimalQuantity) {
        setPrice(productFocus.wholesalePrice.toString())

      }
      if (productFocus.wholesaleMinimalQuantity && Number(quantity) < productFocus.wholesaleMinimalQuantity || !productFocus.wholesaleMinimalQuantity) {
        setPrice(productFocus.price.toString());

      }

      setProductsInCart(prevState => {
        const updatedProducts = prevState.map(product =>
          product.productId === productFocus?.productId
            ? { ...product, total: Number(Number(totalItem).toFixed(2)) }
            : product
        );
        return updatedProducts;
      });

      if (!router.asPath.includes("Quantity")) {
        router.replace({
          query: {
            Quantity: productFocus.quantity.toString(),
            Price: parseFloat(productFocus.price.toString()),
            TotalItem: totalItem
          }
        });
      }
    } else {
      setPrice("0");
      setQuantity("0");
    }

  }, [productFocus]);

  useEffect(() => {
    if (productFocus) {

      if (parseFloat(price) > 0 && Number(quantity) > 0 && parseFloat(totalItem) > 0) {
        setTotalItem((Number(quantity) * Number(price)).toFixed(2).replace(",", "."));

        router.replace({
          query: {
            ...router.query,
            Quantity: quantity,
            Price: parseFloat(price).toString(),
            TotalItem: totalItem.toString()
          }
        })
      }
    }
  }, [price, quantity, totalItem])

  const handleFinishSale = () => {
    setProductFocus(undefined);
    router.replace({
      query: { Finalize: "true" }
    });

    setSale((prevState) => ({
      ...prevState,
      products: productsInCart,
    }));
  };

  return (
    <form className="pt-10 w-full flex flex-col min-[870px]:flex-row items-center gap-4">
      <div className="flex gap-4 w-full items-center">
        <Input
          value={quantity}
          onChange={(e) => {
            {
              setQuantity(e.target.value);
            }
          }}
          type="number"
        >
          Quantidade
        </Input>

        <Input
          type="number"
          value={price}
          onChange={(e) => {
            {
              const value = e.target.value
              setPrice(value);
            }
          }}
        >
          Preço
        </Input>

        <div className="w-full flex-1 transition-all text-xs min-[478px]:text-base group hover:ring-indigo-500 focus-within:ring-indigo-500 flex ring-1 rounded-lg ring-zinc-500 p-3 relative flex-col">
          <div className="font-bold rounded-md group-hover:text-indigo-500 absolute text-nowrap group-focus-within:text-indigo-500 left-1 -top-4 px-2 bg-white dark:bg-gray-900">
            Total Item
          </div>
          <p className="text-ellipsis overflow-hidden font-bold ring-1 group-hover:text-indigo-500 group-hover:ring-indigo-500 ring-zinc-700 dark:ring-zinc-500 w-full text-center py-4 md:text-start md:p-4 rounded-md">
            {productFocus
              ? Number(totalItem).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })
              : 0}
          </p>
        </div>

        <div className="w-full flex-1 transition-all text-xs min-[478px]:text-base group hover:ring-indigo-500 focus-within:ring-indigo-500 flex ring-1 rounded-lg ring-zinc-500 p-3 relative flex-col">
          <div className="font-bold rounded-md absolute text-nowrap group-hover:text-indigo-500 group-focus-within:text-indigo-500 left-1 -top-4 px-2 bg-white dark:bg-gray-900">
            Total
          </div>
          <p className="text-ellipsis overflow-hidden font-bold ring-1 group-hover:text-indigo-500 group-hover:ring-indigo-500 ring-zinc-500 w-full text-center py-4 md:text-start md:p-4 rounded-md">
            {productFocus
              ? total.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })
              : 0}
          </p>
        </div>
      </div>

      <button
        type="button"
        disabled={productsInCart.length <= 0}
        onClick={handleFinishSale}
        className="w-full disabled:hover:ring-zinc-700 disabled:cursor-not-allowed disabled:hover:text-zinc-700 flex flex-1 items-center justify-center py-3 md:p-3 text-nowrap h-16 focus:outline-none focus:ring-indigo-700 focus:text-indigo-700 rounded-md ring-1 ring-zinc-700 dark:ring-zinc-500 hover:text-indigo-700 focus:dark:text-indigo-500 focus:dark:ring-indigo-500 hover:dark:text-indigo-500 hover:dark:ring-indigo-500 hover:ring-indigo-700 font-bold transition-all"
      >
        Finalizar venda
      </button>
    </form>
  );
};
