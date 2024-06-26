import { LogFilter } from "./LogFilter";
import { useShowPayments } from "../../hooks/useShowPayments";
import { useAggregateProducts } from "../../hooks/useAggregateProducts";

export const LogDetails = () => {
  const values = useShowPayments();

  const { aggregateProducts } = useAggregateProducts();

  const tratedProducts = aggregateProducts();

  const cashFormat = (value: number) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex flex-col h-full gap-4 w-full">
      <div>
        <LogFilter />
      </div>
      <div className="flex w-full gap-2 sm:justify-center sm:text-sm md:text-base lg:text-2xl font-bold text-green-700 dark:text-green-400 flex-wrap md:flex-row text-nowrap md:justify-between mt-4">
        {values.map(([key, value]) => (
          <h3 key={key}>
            {key}: {cashFormat(value)}
          </h3>
        ))}
      </div>
      <div className="gap-4 flex-col flex h-full p-2 md:p-12 lg:p-12 rounded-md w-full bg-gray-300 dark:bg-gray-950">
        <div>
          <table className="table-fixed w-full text-nowrap divide-y divide-gray-700">
            <thead className="sticky top-0 z-10 bg-gray-400 text-white dark:bg-gray-800">
              <tr className="sm:text-sm md:text-base text-xs">
                <th>Produto</th>
                <th>Quantidade Vendida</th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-900 font-bold text-nowrap divide-y divide-gray-700">
              {tratedProducts.map((log) => (
                <tr key={log.id}>
                  <td>{log.name}</td>
                  <td>{log.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
