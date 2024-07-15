import { useAggregateProducts } from "../../hooks/useAggregateProducts";


export const Table = () => {
  const { aggregateProducts } = useAggregateProducts();

  const tratedProducts = aggregateProducts();

  const cashFormat = (value: number) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <table className="table-fixed w-full text-nowrap divide-y divide-gray-700">
            <thead className="sticky top-0 z-10 bg-gray-400 text-white dark:bg-gray-800">
              <tr className="sm:text-sm md:text-base text-xs">
                <th>Produto</th>
                <th>Quantidade Vendida</th>
                <th>Custo Compra</th>
                <th>Preço Venda</th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-900 font-bold text-nowrap divide-y divide-gray-700">
              {tratedProducts.map((log) => (
                <tr key={log.id}>
                  <td>{log.name}</td>
                  <td>{log.quantity}</td>
                  <td>{cashFormat(log.purchasePrice)}</td>
                  <td>{cashFormat(log.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
  )
}