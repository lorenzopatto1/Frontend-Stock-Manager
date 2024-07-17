import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePricesData } from "../hooks/usePricesData";
import { ProductType } from "../interfaces/product-data";

const TotalCostAndSalePrices = () => {
  const [showValues, setShowValues] = useState(true);
  const { data, isLoading } = usePricesData();
  const purchaseCost = data?.data.filter(product => product.type !== ProductType.Mix).reduce((num, prices) => num + prices.purchasePrice * prices.quantity, 0) || 0
  const saleCost = data?.data.filter(product => product.type !== ProductType.Mix).reduce((num, prices) => num + prices.salePrice * prices.quantity, 0) || 0

  console.log(data);

  const handleToggleShowValues = () => {
    setShowValues(!showValues);
  };
  
  return (
    <div className="flex gap-2 justify-around my-6 text-xs min-[438px]:text-base lg:text-xl xl:text-2xl font-bold">
      <h2 className="text-orange-600 dark:text-orange-600 flex gap-2 items-center text-nowrap">
        Custo compra:{" "}
        {isLoading && showValues && <div className="w-32 animate-pulse h-2 bg-gray-500 text-gray-500"></div>}
        {!isLoading && showValues
          ? purchaseCost?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })
          : !showValues && "R$ ----------"}
      </h2>
      <h2 className="flex gap-2 items-center text-green-800 dark:text-green-600 text-nowrap">
        Valor total:{" "}
        {isLoading && showValues && <div className="w-32 animate-pulse h-2 bg-gray-500 text-gray-500"></div>}
        {!isLoading && showValues
          ? saleCost?.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })
          : !showValues && "R$ ----------"}
        <button
          className="outline-none"
          type="button"
          onClick={handleToggleShowValues}
        >
          {showValues ? (
            <EyeIcon className="w-5 min-[340px]:w-8 stroke-zinc-900 dark:stroke-zinc-300" />
          ) : (
            <EyeSlashIcon className="w-5 min-[340px]:w-8 stroke-zinc-900 dark:stroke-zinc-300" />
          )}
        </button>
      </h2>
    </div>
  );
};

export default TotalCostAndSalePrices;
