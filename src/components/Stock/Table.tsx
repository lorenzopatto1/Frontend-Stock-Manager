import { ProductCard } from "./ProductCard";
import { Filters } from "./Filters";

export const Table = () => {
  return (
    <>
      <Filters />
      <div className="flex flex-1 basis-0 overflow-y-auto w-full h-full overflow-x-hidden items-start justify-center">
        <table className="table-fixed xl:table-auto text-nowrap divide-y divide-gray-700 w-full">
          <thead className="w-full sticky top-0 z-[9] text-xs lg:text-sm  bg-gray-400 dark:bg-gray-900">
            <tr>
              <th>
                <abbr title="Categoria">Categoria</abbr>
              </th>
              <th>
                <abbr title="Nome">Nome</abbr>
              </th>
              <th>
                <abbr title="Quantidade">Quantidade</abbr>
              </th>
              <th className="hidden min-[530px]:table-cell">
                <abbr title="Preço de compra">Preço de compra</abbr>
              </th>
              <th className="hidden min-[392px]:table-cell">
                <abbr title="Preço de venda">Preço de venda</abbr>
              </th>
              <th className="hidden md:table-cell">
                <abbr title="Validade">Validade</abbr>
              </th>
              <th className="px-0 hidden xl:table-cell"></th>
            </tr>
          </thead>
          <tbody className="divide-y font-bold divide-gray-700">
            <ProductCard />
          </tbody>
        </table>
      </div>
    </>
  );
};
