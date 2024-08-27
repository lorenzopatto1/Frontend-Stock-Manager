"use client";

import { useCallback, useEffect, useState } from "react";
import { Input } from "./Input";
import { useCartProducts } from "../../context/CartProductsContext";
import { useRouter } from "next/router";
import { SaleRelatory } from "../../interfaces/products-sold";

export const SaleData = () => {
  const { setSale, productsInCart, setProductsInCart, productFocus, total } = useCartProducts();
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    if (productFocus) {
      const product = productsInCart.find(product => product.product_Id === productFocus.id)
      if (product) {
        setQuantity(product.quantity);
        setTotalItem(product.total);
      }

    } else {
      resetFields();
    }
  }, [productFocus?.id]);

  useEffect(() => {
    if (productFocus) {
      const { wholesaleMinimalQuantity, wholesaleUnityPrice, salePrice } = productFocus;
      setPrice(priceIfWholesale(quantity, salePrice, wholesaleMinimalQuantity, wholesaleUnityPrice));
    }
  }, [quantity]);

  useEffect(() => {
    if (productFocus) {
      const calcTotalItem = calculateTotalItem(quantity, price);
      updateCartProductPrice(price);

      if (quantity > 0 && price > 0 && calcTotalItem > 0) {
        setTotalItem(calcTotalItem);
        updateCartProduct(quantity, calcTotalItem);
      }
    }
  }, [quantity, price]);

  const calculateTotalItem = (quantity: number, price: number) => Number((quantity * price).toFixed(2));

  const priceIfWholesale = useCallback((
    quantity: number,
    price: number,
    wholesaleMinimalQuantity: number | null,
    wholesalePrice: number | null
  ) => {
    if (wholesaleMinimalQuantity && wholesalePrice) {
      if (quantity >= wholesaleMinimalQuantity) {
        return wholesalePrice
      }
    }

    return price
  }, [])

  const resetFields = () => {
    setQuantity(0);
    setPrice(0);
    setTotalItem(0);
  };

  const updateCartProductPrice = (salePrice: number) => {
    setProductsInCart((prevState) =>
      prevState.map((product) =>
        product.product_Id === productFocus?.id
          ? { ...product, salePrice }
          : product
      )
    );
  };

  const updateCartProduct = (quantity: number, totalItem: number) => {
    setProductsInCart((prevState) =>
      prevState.map((product) =>
        product.product_Id === productFocus?.id
          ? { ...product, quantity, total: totalItem }
          : product
      )
    );
  };

  const handleFinishSale = () => {
    router.replace({ query: { Finalize: "true" } });

    setSale((prevState) => ({
      ...prevState,
      products: productsInCart,
    } as SaleRelatory));
  };

  return (
    <form className="pt-10 w-full flex flex-col min-[870px]:flex-row items-center gap-4">
      <div className="flex gap-4 w-full items-center">
        <Input
          value={quantity.toString()}
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="number"
        >
          Quantidade
        </Input>

        <Input
          type="number"
          value={price.toString()}
          onChange={(e) => setPrice(Number(e.target.value))}
        >
          Preço
        </Input>

        <div className="w-full flex-1 transition-all text-xs min-[478px]:text-base group hover:ring-indigo-500 focus-within:ring-indigo-500 flex ring-1 rounded-lg ring-zinc-500 p-3 relative flex-col">
          <div className="font-bold rounded-md group-hover:text-indigo-500 absolute text-nowrap group-focus-within:text-indigo-500 left-1 -top-4 px-2 bg-white dark:bg-gray-900">
            Total Item
          </div>
          <p className="text-ellipsis overflow-hidden font-bold ring-1 group-hover:text-indigo-500 group-hover:ring-indigo-500 ring-zinc-700 dark:ring-zinc-500 w-full text-center py-4 md:text-start md:p-4 rounded-md">
            {productFocus
              ? totalItem.toLocaleString("pt-br", {
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