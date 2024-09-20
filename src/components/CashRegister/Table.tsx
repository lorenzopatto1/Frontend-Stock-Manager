"use client"

import { TrashIcon } from "lucide-react";
import { useCartProducts } from "../../context/CartProductsContext";
import { useQuery } from "@tanstack/react-query";
import { useProductsData } from "../../hooks/useProductsData";
import { useEffect, useState, type KeyboardEvent } from "react";

export const Table = () => {
  const {
    productsInCart,
    productFocus,
    setProductFocus,
    handleRemoveProductAtCart,
  } = useCartProducts();
  const [productFocusId, setProductFocusId] = useState(productFocus?.id);

  const { data } = useQuery({
    queryKey: ['products-data'],
    queryFn: useProductsData,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && productFocusId) {
      const productEquals = data.data?.find(product => product.id === productFocusId)
      setProductFocus(productEquals);
    } else {
      setProductFocus(undefined);
    }

  }, [productFocusId])

  const handleSelectProduct = (id?: string) => {
    if (id && id !== productFocusId) setProductFocusId(id);
    else setProductFocusId(undefined)
  };

  const handleProductKeyDown = (event: KeyboardEvent, id?: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelectProduct(id);
    }
  }

  return (
    <div className="relative flex flex-1 basis-0 overflow-y-auto w-full h-full overflow-x-hidden items-start justify-center">
      <table className=" table-fixed text-xs md:text-sm lg:text-base text-nowrap w-full">
        <thead className="sticky top-0 z-40 bg-gray-400 text-white dark:bg-gray-800">
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700 relative">
          {productsInCart ? (
            productsInCart.map((product) => (
              <tr
                tabIndex={0}
                key={product.product_Id}
                className={`${productFocus?.id === product.product_Id &&
                  "!bg-indigo-400 dark:!bg-indigo-600 "
                  } hover:bg-indigo-300 dark:hover:bg-indigo-900 relative transition-all focus:outline-none focus:!bg-indigo-300 dark:!focus:bg-indigo-900 cursor-pointer`}
                onClick={() => handleSelectProduct(product.product_Id)}
                onKeyDown={(e) => handleProductKeyDown(e, product.product_Id)}
              >
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.salePrice.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="flex items-center justify-between">
                  {product.total.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                  {productFocus
                    && productFocus?.id === product.product_Id
                    && (
                      <button
                        onClick={handleRemoveProductAtCart}
                        className="absolute focus:outline-none focus:text-red-700 right-2 font-bold bg-transparent rounded-md text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        <TrashIcon className="w-full" />
                      </button>
                    )}
                </td>
              </tr>
            ))
          ) : (
            <p>Selecione produtos para venda</p>
          )}
        </tbody>
      </table>
    </div>
  );
};
