import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, ChartBarIcon } from '@heroicons/react/16/solid';
import { ValuesCard } from '../components/Dashboard/ValuesCard';
import { Settings } from '../components/Settings/Settings';
import { Chart } from '../components/Dashboard/Chart';
import { MonthResult } from '../components/Dashboard/MonthResult';
import { CubeIcon } from '@heroicons/react/24/outline';
import { usePricesData } from '../hooks/usePricesData';
import { ProductType } from '../interfaces/product-data';
import { useProductsData } from '../hooks/useProductsData';
import { Nav } from '../components/Nav/Nav';
import { Header } from '../components/Header';
import { useShowPayments } from '../hooks/useShowPayments';
import { Percentage } from '../components/Dashboard/Percentage';



const stockValues = [
  {
    title: "Valor do estoque inicial",
    icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
    value: '----',
    date: new Date(2024, 6, 1)
  },
  {
    title: "Valor do estoque final",
    icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
    value: '----',
    date: new Date(2024, 6, 31)
  },
  {
    title: "Diferença do estoque",
    icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
    value: '----',
    month: new Date()
  }
];



export const Dashboard = () => {
  const { count = 0 } = useProductsData();
  const { data } = usePricesData();
  const billing = useShowPayments();
  const purchaseCost = data?.data.filter(product => product.type !== ProductType.Mix).reduce((num, prices) => num + prices.purchasePrice * prices.quantity, 0) || 0
  const saleCost = data?.data.filter(product => product.type !== ProductType.Mix).reduce((num, prices) => num + prices.salePrice * prices.quantity, 0) || 0

  const values = [
    {
      title: "Meu faturamento",
      icon: <ChartBarIcon className="w-6 fill-green-700 dark:fill-green-500" />,
      value: billing[0][1],
      date: new Date()
    },
    {
      title: "Minhas despesas",
      icon: <ArrowTrendingDownIcon className="w-6 fill-red-500" />,
      value: '----',
      date: new Date()
    },
    {
      title: "Meus investimentos",
      icon: <ArrowTrendingUpIcon className="w-6 fill-green-700 dark:fill-green-500" />,
      value: '----',
      date: new Date()
    }
  ];

  const currentStockValues = [
    {
      title: "Produtos:",
      icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
      value: count.toString(),
    },
    {
      title: "Custo de compra:",
      icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
      value: purchaseCost,
    },
    {
      title: "Valor total de venda:",
      icon: <CubeIcon className="w-6 stroke-gray-600 dark:stroke-white" />,
      value: saleCost,
    }
  ];

  return (
    <div className="flex overflow-auto h-screen">
      <Nav />
      <Settings />

      <main className="flex flex-1 flex-col items-center">
        <Header />
        <div className="grid w-full h-fit gap-0 md:gap-[2vh] 2xl:gap-8 md:p-4 md:w-[90%] xl:w-[80%] grid-cols-3">
          {values.map(item => (
            <ValuesCard key={item.title} icon={item.icon} title={item.title} value={item.value} month={item.date} />
          ))}


          <div className="flex items-center justify-center">
            <Chart />
          </div>

          <MonthResult />

          <div className="grid  w-full gap-0 lg:gap-[1vh] 2xl:gap-4">
            <Percentage />
          </div>

          {stockValues.map(stockValue => (
            <ValuesCard key={stockValue.title} icon={stockValue.icon} title={stockValue.title} value={stockValue.value} date={stockValue.date} month={stockValue.month} />
          ))}

          {currentStockValues.map(stockValue => (
            <ValuesCard key={stockValue.title} icon={stockValue.icon} title={stockValue.title} value={stockValue.value} />
          ))}

        </div>
      </main>
    </div>
  );
};