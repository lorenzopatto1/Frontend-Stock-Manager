import { ProductCard } from "./ProductCard";
import { Filters } from "./Filters";

export const Table = () => {
  return (
    <>
      <Filters />
      <div className="flex overflow-y-auto overflow-x-hidden items-start justify-center">
        <table className="table-fixed text-nowrap divide-y divide-gray-700 w-full">
          <thead className="sticky top-0 z-10 text-sm bg-gray-900">
            <tr>
              <th>Categoria</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço de compra</th>
              <th>Preço de venda</th>
              <th>Validade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            <ProductCard />
          </tbody>
        </table>
      </div>
    </>
  );
};
