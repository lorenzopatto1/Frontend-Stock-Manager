import { PercentBadgeIcon } from '@heroicons/react/16/solid'
import { useShowPayments } from '../../hooks/useShowPayments'

export const Percentage = () => {
  const values = useShowPayments();
  const percentageData = [
    {
      title: 'Porcentagem Líquida:',
      value: Number(((values[0][1] / values[1][1]) * 100 - 100).toFixed(2)) || '---'
    },
    {
      title: 'Porcentagem Bruta:',
      value: '---'
    }
  ]

  return (
    <>
      {percentageData.map(data => (
        <div key={data.title} className="flex flex-col w-full h-full bg-gray-300 dark:bg-black rounded-md p-3">
          <div className="flex justify-between text-xs md:text-sm items-center lg:text-base text-gray-500 dark:text-gray-400 font-bold">
            {data.title}
            <PercentBadgeIcon className="w-6" />
          </div>
          <p className="flex flex-1 h-full justify-center items-center text-2xl xl:text-3xl 2xl:text-5xl text-purple-700 dark:text-purple-500 font-bold">{data.value}%</p>
        </div>
      ))}
    </>
  )
}
