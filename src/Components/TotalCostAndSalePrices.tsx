import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePricesData } from "../hooks/usePricesData";

const TotalCostAndSalePrices = () => {
  const [showValues, setShowValues] = useState(true);
  const { data, isLoading } = usePricesData();
  const purchaseCost = data?.data.reduce((num, prices) => num + prices.purchasePrice * prices.quantity, 0)
  const saleCost = data?.data.reduce((num, prices) => num + prices.salePrice * prices.quantity, 0)

  const handleToggleShowValues = () => {
    setShowValues(!showValues);
  };
  
  return (
    <div className="flex justify-around my-6 text-2xl font-bold">
      <h2 className="text-orange-600 flex gap-2 items-center text-nowrap">
        Custo compra:{" "}
        {isLoading && showValues && <div className="w-32 animate-pulse h-2 bg-gray-500 text-gray-500"></div>}
        {showValues
          ? purchaseCost?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })
          : "R$ ----------"}
      </h2>
      <h2 className="flex gap-2 items-center text-green-600">
        Valor total:{" "}
        {isLoading && showValues && <div className="w-32 animate-pulse h-2 bg-gray-500 text-gray-500"></div>}
        {showValues
          ? saleCost?.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })
          : "R$ ----------"}
        <button
          className="outline-none"
          type="button"
          onClick={handleToggleShowValues}
        >
          {showValues ? (
            <EyeIcon className="w-8 stroke-zinc-300" />
          ) : (
            <EyeSlashIcon className="w-8 stroke-zinc-300" />
          )}
        </button>
      </h2>
    </div>
  );
};

export default TotalCostAndSalePrices;
