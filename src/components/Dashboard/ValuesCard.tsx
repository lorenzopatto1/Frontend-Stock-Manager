interface IValuesCard {
  title: string;
  icon: JSX.Element;
  value: number;
  date?: Date;
}

export const ValuesCard = ({ title, icon, value, date }: IValuesCard) => {
  const month = new Date().toLocaleString([], {month: 'long'});
  return (
    <div className="p-3 flex-1 max-w-full max-h-32 bg-gray-300 dark:bg-black flex flex-col 2xl:gap-1 rounded-md font-bold h-fit">
      <div className="flex justify-between">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm 2xl:text-md">{title}</h3>
        {icon}
      </div>
      <div className="p-1">
      <p className="text-md 2xl:text-lg">{value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
      })}</p>

        <p className="text-xs font-normal text-gray-500 dark:text-gray-400">{date ? date.toLocaleDateString("pt-br") : `No mês de ${month}`}</p>

      </div>
    </div>
  )
}
