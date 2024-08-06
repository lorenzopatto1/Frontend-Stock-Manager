"use client"

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NewProductModal } from "../../components/Stock/NewProductModal.tsx";
import { Table } from "../../components/Stock/Table.tsx";
import { useProductsData } from "../../hooks/useProductsData.ts";

import { Settings } from "../../components/Settings/Settings.tsx";
import { Nav } from "../../components/Nav/Nav.tsx";
import { Header } from "../../components/Header.tsx";
import { useRouter } from "next/router";
import Head from "next/head";

const Stock = () => {
  const { isLoading, isError } = useProductsData();
  const [openNewProductModal, setOpenNewProductModal] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    const path = router.pathname

    setOpenNewProductModal(false);

    router.push(path)

  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token === undefined) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex h-full">
      <Head>
        <title>Estoque</title>
      </Head>
      <Settings />
      <Nav />
      <div className="flex flex-col">
        <Header />
        <header className="mt-2 bg-gray-300 dark:bg-gray-800 shadow flex items-center max-h-12 py-1 justify-between">
          <div className="mx-auto max-w-7xl flex px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-sm min-[438px]:text-base xl:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200">
              Seu estoque:
            </h1>
          </div>
          <button
            className="disabled:cursor-not-allowed mx-auto max-w-md h-full ring-2 rounded-md gap-1 disabled:dark:hover:bg-transparent disabled:dark:text-zinc-200 dark:hover:bg-indigo-500 dark:text-zinc-200 hover:text-indigo-800 disabled:hover:text-black disabled:hover:ring-black disabled:dark:hover:ring-indigo-500 dark:hover:text-white text-brand-500 transition-colors flex items-center justify-center ring-black hover:ring-indigo-800 dark:ring-indigo-500 p-2"
            onClick={() => setOpenNewProductModal(true)}
            disabled={isLoading || isError}
          >
            <PlusCircleIcon className="size-4 sm:size-6 stroke-2" />
            <h1 className="text-xs min-[438px]:text-sm md:text-base font-bold tracking-tight">
              Adicionar produto
            </h1>
          </button>
        </header>
        <main className="flex  justify-center flex-1">
          <div className="w-full md:w-[90%] min-[900px]:w-[80%] my-6 p-4 flex flex-col gap-6 bg-gray-300 dark:bg-[#00081d] rounded-[2rem] sm:px-6 lg:px-8">
            <Table />
            <NewProductModal
              open={openNewProductModal}
              handleClose={handleClose}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stock;