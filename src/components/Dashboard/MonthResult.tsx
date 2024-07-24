import { BanknotesIcon } from "@heroicons/react/16/solid"

const data = [
  {
    title: "Resultado mensal:",
    value: 1000
  },
  {
    title: "Resultado mensal + diferença no estoque:",
    value: 1100
  },
]

export const MonthResult = () => {
  return (
    <div className="flex flex-col gap-8 h-fit">
      {data.map(result => (
        <div className="flex flex-col bg-gray-300 dark:bg-black flex-1 p-3 pb-8 rounded-md font-bold text-gray-600 dark:text-gray-400">
        <h3 className="flex justify-between">
          {result.title}
          <BanknotesIcon className="fill-green-700 dark:fill-green-500" width={32} />
        </h3>
        <p className="ml-1 p-3 text-3xl text-green-700 dark:text-green-500">
          {result.value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
          })}
        </p>
      </div>
      ))}
    </div>
  )
}
