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

const chartData = [
  { payment: "credit", value: 275, fill: "#2EB88A" },
  { payment: "debit", value: 200, fill: "#E88C30" },
  { payment: "pix", value: 187, fill: "#E23670" },
  { payment: "cash", value: 173, fill: "#2662D9" },
]

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
  return (
    <Card className="border-gray-300 bg-gray-300 h-fit dark:border-black dark:bg-black my-1 2xl:my-0 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-bold text-center text-xl">Formas de pagamento:</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="dark:bg-black" hideLabel nameKey="payment" />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="payment"
              innerRadius={40}
              className="stroke-gray-300 focus:outline-none dark:stroke-black"
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="payment" />}
              className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}

