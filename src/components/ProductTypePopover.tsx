import { useEffect, useState } from "react";
import { ProductType } from "../interfaces/product-data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../@/components/ui/popover";
import { useSearchParams } from "react-router-dom";

interface IProductTypePopover {
  defaultValue?: ProductType;
}

export const ProductTypePopover = ({ defaultValue }: IProductTypePopover) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const type = searchParams.get("productType");

  const handleSelectProductType = (type: ProductType) => {
    setSearchParams((state) => {
      state.set("productType", type.toString());
      setPopoverOpen(false);
      return state;
    });
  };

  useEffect(() => {
    defaultValue && defaultValue === 1
      ? handleSelectProductType(ProductType.Unity)
      : defaultValue === 2
      ? handleSelectProductType(ProductType.Mix)
      : handleSelectProductType(ProductType.Unity);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!type) {
      setPopoverOpen(false);
    }
  }, [type]);

  return (
    <Popover open={popoverOpen}>
      <PopoverTrigger asChild>
        <button
          className="w-32 ring-2 py-1 rounded-md ring-black hover:ring-indigo-500 dark:ring-gray-600 dark:hover:ring-indigo-700"
          onClick={() => setPopoverOpen(!popoverOpen)}
        >
          {type && type === "1" ? "Unidade" : ProductType[2]}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-32 dark:bg-gray-700">
        <div className="flex flex-col gap-2">
          <button
            className={`${
              type === "1" ? "!bg-indigo-700 ring-black dark:ring-gray-600 !text-white" : "dark:bg-gray-800 ring-gray-600"
            } p-1 ring-1  hover:ring-indigo-500 hover:bg-indigo-400 hover:text-black dark:hover:text-white  dark:hover:bg-gray-900 rounded-md`}
            onClick={() => handleSelectProductType(ProductType.Unity)}
          >
            Unidade
          </button>
          <button
            className={`${
              type === "2" ? "!bg-indigo-700 ring-black  dark:ring-gray-600 !text-white" : "dark:bg-gray-800 ring-gray-600"
            } p-1 ring-1  hover:ring-indigo-500 hover:bg-indigo-400 hover:text-black dark:hover:text-white  dark:hover:bg-gray-900 rounded-md`}
            onClick={() => handleSelectProductType(ProductType.Mix)}
          >
            Mix
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
