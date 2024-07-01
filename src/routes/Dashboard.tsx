import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Table } from "../Components/Table.tsx";
import { Nav } from "../Components/Nav/Nav.tsx";
import { NewProductModal } from "../Components/NewProductModal.tsx";
import { useProductsData } from "../hooks/useProductsData.ts";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TotalCostAndSalePrices from "../Components/TotalCostAndSalePrices.tsx";

const Dashboard = () => {
  const { count } = useProductsData();
  const [openNewProductModal, setOpenNewProductModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenNewProductModal(false);
  };


  useEffect(() => {
    const token = Cookies.get("token");
    if (token === undefined) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col h-full">
      <Nav />
          <TotalCostAndSalePrices />
      <header className=" bg-gray-300 dark:bg-gray-800 shadow flex items-center max-h-12 py-1 justify-between">
        <div className="mx-auto max-w-7xl flex px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200">
            Produtos: {count}
          </h1>
        </div>
        <button
          className="mx-auto max-w-md h-full ring-2 rounded-md gap-1 dark:hover:bg-indigo-500 dark:text-zinc-200 hover:text-indigo-800 dark:hover:text-white text-brand-500 transition-colors flex items-center justify-center ring-black hover:ring-indigo-800 dark:ring-indigo-500 p-2"
          onClick={() => setOpenNewProductModal(true)}
        >
          <PlusCircleIcon className="size-6 stroke-2" />
          <h1 className="text-md font-bold tracking-tight">
            Adicionar produto
          </h1>
        </button>
      </header>
      <main className="flex items-center justify-center flex-1">
        
        <div className="w-full md:w-[80%] h-[90%] p-4 flex flex-col gap-6 bg-gray-300 dark:bg-[#00081d] rounded-[2rem] sm:px-6 lg:px-8">
          <Table />
          <NewProductModal
            open={openNewProductModal}
            handleClose={handleClose}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
