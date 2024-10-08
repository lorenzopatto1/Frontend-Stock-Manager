"use client"

import { useEffect, useState } from "react";

import { SaleData } from "../../components/CashRegister/SaleData";
import { Table } from "../../components/CashRegister/Table";
import Payment from "../../components/Payment/Payment";
import { useCartProducts } from "../../context/CartProductsContext";
import { useProductsData } from "../../hooks/useProductsData";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

const CashRegister = () => {
  const searchParams = useSearchParams();
  const [searchProductModal, setSearchProductModal] = useState(false);
  const { data } = useProductsData();
  const {
    setProductsInCart,
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

  const hasProduct = data?.filter((product) =>
    product.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase()
      .startsWith(
        productSearch
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      )
  );

  return (
    <div className="flex flex-col h-full">
      <Head>
        <title>Caixa registradora</title>
      </Head>
      <div
        className="relative flex py-12 px-[5%] md:px-[15%] h-full flex-col w-screen items-center"
        onClick={() => searchProductModal && setSearchProductModal(false)}
      >
        <Link
          className="absolute top-4 left-4 p-[1%] text-xs md:text-base sm:p-2 ring-2 ring-indigo-700 dark:ring-indigo-500 dark:text-indigo-500 rounded-md hover:bg-indigo-700 font-bold dark:hover:bg-indigo-500 text-indigo-700 hover:text-white dark:hover:text-white transition-all"
          onClick={() => {
            setProductFocus(undefined);
            setProductsInCart([]);
          }}
          href="/dashboard"
        >
          Fechar caixa
        </Link>
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
          <div className="absolute max-h-[60%] overflow-auto rounded-md flex-col top-24 z-50 w-[81%] md:w-[35%] bg-gray-300 dark:bg-gray-700 p-2">
            {hasProduct?.length ? (
              hasProduct.map((product) => (
                <button
                  className="p-2 w-full text-start focus:outline-none focus:bg-indigo-400 rounded-md hover:bg-gray-400 cursor-pointer dark:hover:bg-gray-800"
                  key={product.id}
                  onClick={() => { handleSelectProduct(product) }}
                >
                  {product.name}
                </button>
              ))
            ) : (
              <div>Nenhum produto com esse nome...</div>
            )}
          </div>
        )}
        <div className="w-full h-[90%] p-4 flex flex-col gap-6 mt-4 bg-gray-300 dark:bg-[#00081d] rounded-[2rem] sm:px-6 lg:px-8">
          <Table />
        </div>
        <SaleData />
      </div>
      {finalize === "true" && <Payment />}
    </div>
  );
};

export default CashRegister;