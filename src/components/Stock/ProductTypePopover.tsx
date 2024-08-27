"use client"

import { useEffect, useState } from "react";
import { ProductType } from "../../interfaces/product-data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../@/components/ui/popover";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface IProductTypePopover {
  defaultValue?: string;
}

export const ProductTypePopover = ({ defaultValue }: IProductTypePopover) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [popoverOpen, setPopoverOpen] = useState(false);

  const type = searchParams.get("productType");

  const handleSelectProductType = (type: string) => {
    router.replace({
      query: { ...router.query, productType: type }
    })
    setPopoverOpen(false);

  };

  useEffect(() => {
    defaultValue && defaultValue === ProductType[1]
      ? handleSelectProductType(ProductType[1])
      : defaultValue === ProductType[2]
        ? handleSelectProductType(ProductType[2])
        : handleSelectProductType(ProductType[1]);
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
          {type && type === ProductType[1] ? "Unidade" : ProductType[2]}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-1 w-32 dark:bg-gray-700">
        <div className="flex flex-col gap-2">
          <button
            className={`${type === "1" ? "!bg-gray-900 ring-black dark:ring-indigo-500 !text-white" : "dark:bg-gray-800 ring-gray-600"
              } p-1 ring-1  hover:ring-indigo-500 hover:bg-indigo-400 hover:text-black dark:hover:text-white  dark:hover:bg-indigo-800 rounded-md`}
            onClick={() => handleSelectProductType(ProductType[1])}
          >
            Unidade
          </button>
          <button
            className={`${type === "2" ? "!bg-gray-900 ring-black dark:ring-indigo-500 !text-white" : "dark:bg-gray-800 ring-gray-600"
              } p-1 ring-1  hover:ring-indigo-500 hover:bg-indigo-400 hover:text-black dark:hover:text-white  dark:hover:bg-indigo-800 rounded-md`}
            onClick={() => handleSelectProductType(ProductType[2])}
          >
            Mix
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
