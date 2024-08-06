"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../@/components/ui/chart"
import { useShowPayments } from "../../hooks/useShowPayments"

const chartConfig = {
  value: {
    label: "Formas de pagamento",
  },
  credit: {
    label: "Crédito:",
    color: "#2EB88A",
  },
  debit: {
    label: "Débito:",
    color: "#E88C30",
  },
  pix: {
    label: "Pix:",
    color: "#E23670",
  },
  cash: {
    label: "Dinheiro:",
    color: "#2662D9",
  },
} satisfies ChartConfig

export const Chart = () => {
  const values = useShowPayments();

  const chartData = [
    { payment: "credit", value: values[4][1], fill: chartConfig.credit.color },
    { payment: "debit", value: values[3][1], fill: chartConfig.debit.color },
    { payment: "pix", value: values[5][1], fill: chartConfig.pix.color },
    { payment: "cash", value: values[2][1], fill: chartConfig.cash.color },
  ]

  return (
    <Card className="border-gray-300 bg-gray-300 h-full dark:border-black dark:bg-black lg:my-1 2xl:my-0 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-center text-sm md:text-lg 2xl:text-xl">
          Formas de pagamento:
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="min-h-full mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="dark:bg-black"
                  hideLabel
                  nameKey="payment"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="payment"
              innerRadius={40}
              className="stroke-gray-300 focus:outline-none dark:stroke-black"
            />
            <ChartLegend
              content={<ChartLegendContent key="payment" nameKey="payment" />}
              className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

