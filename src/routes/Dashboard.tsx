import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Table } from "../Components/Table.tsx";
import { Nav } from "../Components/Nav.tsx";
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
    <div className="h-screen">
      <Nav />
          <TotalCostAndSalePrices />
      <header className="bg-gray-800 shadow flex items-center max-h-12 py-1 justify-between">
        <div className="mx-auto max-w-7xl flex px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-200">
            Produtos: {count}
          </h1>
        </div>
        <button
          className="mx-auto max-w-md h-full border-2 rounded-md gap-1 hover:bg-brand-500 hover:text-white text-brand-500 transition-colors flex items-center justify-center border-brand-500 p-2"
          onClick={() => setOpenNewProductModal(true)}
        >
          <PlusCircleIcon className="size-6 stroke-2" />
          <h1 className="text-md font-bold tracking-tight">
            Adicionar produto
          </h1>
        </button>
      </header>
      <main className="my-8">
        
        <div className="mx-auto max-w-7xl h-full min-h-full p-4 flex flex-col gap-6 bg-[#00081d] rounded-[2rem] sm:px-6 lg:px-8">
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
