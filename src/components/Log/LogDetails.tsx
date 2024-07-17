import { LogFilter } from "./LogFilter";
import { useShowPayments } from "../../hooks/useShowPayments";
import { Table } from "./Table";
import { Category } from "../Category";
import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

export const LogDetails = () => {
  const values = useShowPayments();
  const [, setSearchParams] = useSearchParams();

  const cashFormat = (value: number) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const changeFilterName = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(state => {
      state.set("name", event.target.value)
      if (event.target.value.length < 1) {
        state.delete("name");
      }
      return state;
    })
  }

  return (
    <div className="flex flex-col h-full gap-4 w-full">
      <div className="flex">
        <input type="text" autoComplete="new-password" className="p-2 bg-transparent ring-1 hover:ring-2 focus:ring-2 ring-black hover:ring-indigo-700 focus:ring-indigo-700 dark:ring-zinc-500 hover:dark:ring-indigo-500 focus:dark:ring-indigo-500 rounded-md" onChange={changeFilterName} placeholder="Nome do produto" />
        <LogFilter />
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
