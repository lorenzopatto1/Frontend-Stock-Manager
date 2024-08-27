"use client"

import { SaleCalendarFilter } from "./SaleCalendarFilter";
import { useShowPayments } from "../../hooks/useShowPayments";
import { Table } from "./Table";
import { Category } from "../Category";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

export const SaleDetails = () => {
  const values = useShowPayments();
  const searchParams = useSearchParams();
  const router = useRouter();

  const cashFormat = (value: number) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const changeFilterName = (event: ChangeEvent<HTMLInputElement>) => {
    const path = router.pathname;
    router.replace({
      query: { ...router.query, name: event.target.value }
    })

    if (event.target.value.length < 1) {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete("name");
      router.push(`${path}?${nextSearchParams.toString()}`);
    }

  }

  return (
    <div className="flex flex-col h-full gap-4 w-full">
      <div className="flex flex-col justify-center md:flex-row gap-4 md:gap-0">
        <input type="text" autoComplete="new-password" className="p-2 bg-transparent ring-1 hover:ring-2 focus:ring-2 ring-black hover:ring-indigo-700 focus:ring-indigo-700 dark:ring-zinc-500 hover:dark:ring-indigo-500 focus:dark:ring-indigo-500 rounded-md" onChange={changeFilterName} placeholder="Nome do produto" />
        <SaleCalendarFilter />
        <Category />
      </div>
      <div className="flex w-full gap-2 sm:justify-center sm:text-sm md:text-base lg:text-2xl font-bold text-green-700 dark:text-green-400 flex-wrap md:flex-row text-nowrap md:justify-between mt-4">
        {values.map(([key, value]) => (
          <h3 key={key}>
            {key}: {cashFormat(value)}
          </h3>
        ))}
      </div>
      <div className="gap-4 flex-col flex h-full p-2 md:p-12 lg:p-12 rounded-md w-full bg-gray-300 dark:bg-gray-950">
        <Table />
      </div>
    </div>
  );
};
