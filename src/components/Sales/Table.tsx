import { useSearchParams } from "next/navigation";
import { useAggregateProducts } from "../../hooks/useAggregateProducts";

export const Table = () => {
  const searchParams = useSearchParams();
  const { soldProducts } = useAggregateProducts();

  const productName = searchParams.get("name")
  const productCategory = searchParams.get("category")

  const cashFormat = (value: number) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex flex-1 basis-0 overflow-y-auto w-full h-full overflow-x-hidden items-start justify-center">
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
          {soldProducts.filter((product) =>
            productName !== null
              ? product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().startsWith(productName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
              : product.name
          )
            .filter((product) =>
              productCategory !== null
                ? productCategory === product.category
                : product.category
            ).map((log) => (
              <tr key={log.id}>
                <td>{log.name}</td>
                <td>{log.quantity}</td>
                <td>{cashFormat(log.purchasePrice)}</td>
                <td>{cashFormat(log.salePrice)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
