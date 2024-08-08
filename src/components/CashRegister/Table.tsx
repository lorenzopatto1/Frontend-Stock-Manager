"use client"

import { useCartProducts } from "../../context/CartProductsContext";
import { ProductsSold } from "../../interfaces/products-sold";

export const Table = () => {
  const {
    productsInCart,
    productFocus,
    setProductFocus,
    handleRemoveProductAtCart,
  } = useCartProducts();

  const handleSelect = (product: ProductsSold) => {

    if (product.productId !== productFocus?.productId) {
      setProductFocus(product);
    } else {
      setProductFocus(undefined);
    }
  };

  return (
    <div className="relative flex flex-1 basis-0 overflow-y-auto w-full h-full overflow-x-hidden items-start justify-center">
      {productFocus && (
        <button
          onClick={handleRemoveProductAtCart}
          className="absolute top-1 right-1 z-50 font-bold bg-white hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-950 p-2 rounded-md text-red-500 hover:text-red-700 dark:hover:text-red-400"
        >
          Remover
        </button>
      )}
      <table className=" table-fixed text-xs md:text-sm lg:text-base text-nowrap divide-ydivide-gray-700 w-full">
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
                key={product.productId}
                className={`${productFocus?.productId === product.productId &&
                  "!bg-indigo-400 dark:!bg-indigo-600 "
                  } hover:bg-indigo-300 dark:hover:bg-indigo-900 relative transition-all cursor-pointer`}
                onClick={() => handleSelect(product)}
              >
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.wholesaleMinimalQuantity &&
                    product.quantity >= product.wholesaleMinimalQuantity
                    ? product.wholesalePrice?.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                    : product.wholesaleMinimalQuantity && product.quantity < product.wholesaleMinimalQuantity && product.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </td>
                <td>
                  {product.total.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
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
