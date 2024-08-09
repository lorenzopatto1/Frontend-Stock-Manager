"use client"

import { useEffect, useState } from "react";
import { Input } from "./Input";
import { useCartProducts } from "../../context/CartProductsContext";
import { useRouter } from "next/router";

export const SaleData = () => {
  const { setSale, productsInCart, setProductsInCart, productFocus, setProductFocus, total } =
    useCartProducts();
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  useEffect(() => {
    if (productFocus) {
      setQuantity(productFocus.quantity);
      setTotalItem(productFocus.total);
      if (!router.asPath.includes("Quantity")) {
        router.replace({
          query: {
            ...router.query,
            Quantity: quantity,
            Price: parseFloat(price.toString()),
            TotalItem: quantity * parseFloat(price.toString())
          }
        })
      }
    } else {
      setQuantity(0);
      setPrice(0)
    }
  }, [productFocus?.productId])

  useEffect(() => {
    if (productFocus) {
      if (productFocus.wholesaleMinimalQuantity && productFocus.wholesalePrice && quantity >= productFocus.wholesaleMinimalQuantity) {
        setPrice(productFocus.wholesalePrice)
      } else {
        setPrice(productFocus.price)
      }
    }
  }, [quantity])

  useEffect(() => {
    if (productFocus) {
      if (productFocus.wholesaleMinimalQuantity && productFocus.wholesalePrice && quantity >= productFocus.wholesaleMinimalQuantity) {
        setProductsInCart(prevState => {
          const updatedProducts = prevState.map(product =>
            product.productId === productFocus?.productId
              ? { ...product, wholesalePrice: price }
              : product
          );
          return updatedProducts;
        });
      } else {
        setProductsInCart(prevState => {
          const updatedProducts = prevState.map(product =>
            product.productId === productFocus?.productId
              ? { ...product, price }
              : product
          );
          return updatedProducts;
        });
      }
      const calcTotalItem = Number((quantity * parseFloat(price.toString())).toFixed(2))
      router.replace({
        query: {
          ...router.query,
          Quantity: quantity,
          Price: parseFloat(price.toString()),
          TotalItem: calcTotalItem
        }
      })

      if (quantity > 0 && parseFloat(price.toString()) > 0 && parseFloat(totalItem.toString()) > 0) {
        setTotalItem(calcTotalItem);

        setProductsInCart(prevState => {
          const updatedProducts = prevState.map(product =>
            product.productId === productFocus?.productId
              ? { ...product, quantity, total: calcTotalItem }
              : product
          );
          return updatedProducts;
        });
      }

    }
  }, [quantity, price])

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
          value={quantity.toString()}
          onChange={(e) => {
            {
              setQuantity(Number(e.target.value));
            }
          }}
          type="number"
        >
          Quantidade
        </Input>

        <Input
          type="number"
          value={price.toString()}
          onChange={(e) => {
            {
              const value = Number(e.target.value)
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
