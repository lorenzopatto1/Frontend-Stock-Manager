import { useEffect, useState } from "react";
import { SaleData } from "../Components/CashRegister/SaleData";
import { Table } from "../Components/CashRegister/Table";
import { useProductsData } from "../hooks/useProductsData";
import { ProductsSold } from "../interfaces/products-sold";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { useCartProducts } from "../Context/CartProductsContext";
import Payment from "../Components/Payment/Payment";

export const CashRegister = () => {
  const [searchParams] = useSearchParams();
  const [searchProductModal, setSearchProductModal] = useState(false);
  const { data, isError } = useProductsData();
  const {
    productsInCart,
    setProductsInCart,
    productFocus,
    setProductFocus,
    productSearch,
    setProductSearch,
    handleSelectProduct,
  } = useCartProducts();

  const finalize = searchParams.get("Finalize");

  useEffect(() => {
    if (productSearch.length >= 1) setSearchProductModal(true);
    else setSearchProductModal(false);
  }, [productSearch]);

  useEffect(() => {
    const editedProduct =
      productsInCart &&
      productsInCart.find((product) => product.productId === productFocus?.productId);
    const quantity = Number(searchParams.get("Quantity"));
    const price = Number(searchParams.get("Price"));

    if (editedProduct) {
      const edit: ProductsSold = {
        ...editedProduct,
        quantity,
        price,
        total: quantity * price,
      };
      setProductFocus((prevState) => ({
        ...prevState!,
        quantity,
        price,
        total: quantity * price,
      }));

      setProductsInCart((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === editedProduct.productId ? { ...product, ...edit } : product
        )
      );
    }
    //eslint-disable-next-line
  }, [searchParams]);

  const hasProduct = data?.find((product) =>
    product.name.toLocaleLowerCase().startsWith(productSearch.toLowerCase())
  );

  if (isError) {
    toast.error("Houve um problema ao encontrar seus produtos");
  }

  return (
    <>
      <div
        className="relative flex py-12 px-[5%] md:px-[15%] h-full flex-col w-screen items-center"
        onClick={() => searchProductModal && setSearchProductModal(false)}
      >
        <Link className="absolute top-4 left-4 p-[1%] text-xs md:text-base sm:p-2 ring-2 ring-indigo-700 dark:ring-indigo-500 dark:text-indigo-500 rounded-md hover:bg-indigo-700 font-bold dark:hover:bg-indigo-500 text-indigo-700 hover:text-white dark:hover:text-white transition-all" onClick={() => {setProductFocus(undefined); setProductsInCart([])}} to="/home">Fechar caixa</Link>
        <input
          className="bg-transparent p-2 rounded-md ring-1 placeholder:text-black dark:placeholder:text-zinc-200 focus:ring-indigo-500 ring-zinc-500 w-[50%]"
          autoComplete="new-password"
          autoCorrect="off"
          type="text"
          placeholder="Nome do produto"
          value={productSearch}
          onClick={() => !searchProductModal && setSearchProductModal(true)}
          onChange={(e) => setProductSearch(e.target.value)}
        />
        {searchProductModal && productSearch && (
          <div className="fixed rounded-md flex-col top-24 z-50 w-[81%] md:w-[35%] flex justify-center bg-gray-300 dark:bg-gray-700 p-2">
            {hasProduct ? (
              data
                ?.filter((product) =>
                  product.name
                    .toLocaleLowerCase()
                    .startsWith(productSearch.toLowerCase())
                )
                .map((product) => (
                  <div
                    className="p-2 w-full rounded-md hover:bg-gray-400 cursor-pointer dark:hover:bg-gray-800"
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                  >
                    {product.name}
                  </div>
                ))
            ) : (
              <div>Nenhum produto com esse nome...</div>
            )}
          </div>
        )}
        <div className="flex mt-4 flex-1 bg-gray-300 dark:bg-[#00081d] rounded-md p-2 overflow-y-auto items-start justify-center">
          <Table />
        </div>
        <SaleData />
      </div>
      {finalize === "true" && <Payment />}
    </>
  );
};
