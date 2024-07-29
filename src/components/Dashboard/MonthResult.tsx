import { BanknotesIcon } from "@heroicons/react/16/solid"
import { useShowPayments } from "../../hooks/useShowPayments";

interface IData {
  title: string;
  value: number | string;
}


export const MonthResult = () => {
const values = useShowPayments();
  const data: IData[] = [
    {
      title: "Resultado mensal:",
      value: values[1][1]
    },
    {
      title: "Resultado mensal + diferença no estoque:",
      value: '----'
    },
  ]

  return (
    <div className="grid grid-cols-1 flex-col gap-0 lg:gap-[1vh] 2xl:gap-4">
      {data.map(result => (
        <div className="flex flex-col bg-gray-300 dark:bg-black flex-1 p-2 pb-3 2xl:p-3 2xl:pb-8 rounded-md font-bold text-gray-600 dark:text-gray-400">
        <h3 className="flex text-sm 2xl:text-base justify-between overflow-hidden text-nowrap text-ellipsis">
          {result.title}
          <BanknotesIcon className="fill-green-700 dark:fill-green-500" width={32} />
        </h3>
        <p className="flex flex-1 items-center justify-center ml-1 2xl:p-3 text-xl 2xl:text-3xl text-green-700 dark:text-green-500">
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
