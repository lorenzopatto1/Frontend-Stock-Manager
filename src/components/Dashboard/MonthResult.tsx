import { BanknotesIcon } from "@heroicons/react/16/solid"
import { useShowPayments } from "../../hooks/useShowPayments";

interface IData {
  title: string;
  value: number | string;
}


interface IMonthResult {
  totalOut: number | undefined
}


export const MonthResult = ({ totalOut = 0 }: IMonthResult) => {
  const values = useShowPayments();
  const data: IData[] = [
    {
      title: "Resultado mensal:",
      value: values[1][1] - totalOut 
    },
    {
      title: "Resultado mensal + diferença no estoque:",
      value: 0
    },
  ]

  return (
    <div className="grid grid-cols-1 flex-col gap-[2vh]">
      {data.map(result => (
        <div key={result.title} className="flex flex-col bg-gray-300 dark:bg-black flex-1 p-2 pb-3 2xl:p-3 2xl:pb-8 rounded-md font-bold text-gray-600 dark:text-gray-400">
          <h3 className="flex text-sm 2xl:text-base justify-between overflow-hidden text-nowrap text-ellipsis">
            {result.title}
            <BanknotesIcon className="fill-green-700 dark:fill-green-500" width={32} />
          </h3>
          <p className={`${Number(result.value) > 0 ? 'text-green-700 dark:text-green-500': 'text-red-700 dark:text-red-500'}, flex flex-1 items-center justify-center ml-1 2xl:p-3 text-xl 2xl:text-3xl`}>
            {result.value.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL"
            }) || result.value}
          </p>
        </div>
      ))}
    </div>
  )
}
