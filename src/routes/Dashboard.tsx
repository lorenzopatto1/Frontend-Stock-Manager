import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, ChartBarIcon, PercentBadgeIcon } from '@heroicons/react/16/solid'
import { ValuesCard } from '../components/Dashboard/ValuesCard'
import { Nav } from '../components/Nav/Nav'
import { Settings } from '../components/Settings/Settings'
import { Chart } from '../components/Dashboard/Chart'
import { MonthResult } from '../components/Dashboard/MonthResult'
import { CubeIcon } from '@heroicons/react/24/outline'

const values = [
  {
    title: "Meu faturamento",
    icon: <ChartBarIcon className="w-6 fill-green-700 dark:fill-green-500" />,
    value: 2000
  },
  {
    title: "Minhas despesas",
    icon: <ArrowTrendingDownIcon className="w-6 fill-red-500" />,
    value: 500
  },
  {
    title: "Meus investimentos",
    icon: <ArrowTrendingUpIcon className="w-6 fill-green-700 dark:fill-green-500" />,
    value: 500
  },
]

const stockValues = [
  {
    title: "Valor do estoque inicial",
    icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
    value: 1592.09,
    date: new Date(2024, 6, 1)
  },
  {
    title: "Valor do estoque final",
    icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
    value: 1692.09,
    date: new Date(2024, 6, 31)
  },
  {
    title: "Diferença do estoque",
    icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
    value: 100
  },
]

export const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Nav />
      <Settings />

      <main className="flex flex-1 flex-col items-center justify-around py-4 gap-4 w-full">
        <div className="flex w-full flex-col justify-around gap-16 min-[837px]:max-w-[80%]">

          <div className="flex gap-16">
            {values.map(item => (
              <ValuesCard icon={item.icon} title={item.title} value={item.value} />
            ))}
          </div>

          <div className="flex gap-16">
            <div className="flex w-[30%] flex-col justify-between">
              <Chart />
              <div className="flex flex-col mt-12 gap-3">
                {stockValues.map(stockValue => (
                  <ValuesCard icon={stockValue.icon} title={stockValue.title} value={stockValue.value} date={stockValue.date} />
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <MonthResult />

              <div className="flex justify-around">
                <div className="flex flex-col w-64 h-64 bg-gray-300 dark:bg-black rounded-md p-3">
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    Porcentagem Liquida:
                    <PercentBadgeIcon className="w-6" />
                  </div>
                  <p className="flex flex-1 justify-center items-center text-5xl text-purple-700 dark:text-purple-500 font-bold">10%</p>
                </div>
                <div className="flex flex-col w-64 h-64 bg-gray-300 dark:bg-black rounded-md p-3">
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    Porcentagem Bruto:
                    <PercentBadgeIcon className="w-6" />
                  </div>
                  <p className="flex flex-1 justify-center items-center text-5xl text-purple-700 dark:text-purple-500 font-bold">30%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

// return (
//   <div className="flex flex-col h-screen">
//     <Nav />
//     <Settings />

//     <main className="flex flex-1 items-center p-4 flex-col">
//       <div className="flex flex-col w-full gap-16 min-[837px]:max-w-[80%]">
//         <div className="w-full flex justify-between gap-32">
//           {values.map(item => (
//             <ValuesCard icon={item.icon} title={item.title} value={item.value} />
//           ))}
//         </div>
//         <div className='w-full justify-between flex'>
//           <Chart />
//           <MonthResult />
//         </div>
//         <div className="flex flex-col gap-16">
//           {stockValues.map(stockValue => (
//             <ValuesCard icon={stockValue.icon} title={stockValue.title} value={stockValue.value} />
//           ))}
//         </div>
//       </div>
//     </main>
//   </div>
// )