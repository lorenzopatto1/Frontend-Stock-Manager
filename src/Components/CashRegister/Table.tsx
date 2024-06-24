import { ProductsSold } from "../../interfaces/products-sold";

interface TableProps {
  productsInCart: ProductsSold[];
  productFocus: ProductsSold | undefined;
  setProductFocus: React.Dispatch<
    React.SetStateAction<ProductsSold | undefined>
  >;
}

export const Table = ({
  productsInCart,
  productFocus,
  setProductFocus,
}: TableProps) => {

  const handleSelect = (product: ProductsSold) => {
    if (product.id !== productFocus?.id) {
      setProductFocus(product);
    } else {
      setProductFocus(undefined);
    }
  };
  return (
    <table className="table-fixed text-nowrap divide-y divide-gray-700 w-full">
      <thead className="sticky top-0 z-9 text-sm bg-gray-800">
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {productsInCart ? (
          productsInCart.map((product) => (
            <tr
              key={product.id}
              className={`${
                productFocus?.id === product.id && "!bg-indigo-600 "
              } hover:bg-indigo-900 `}
              onClick={() => handleSelect(product)}
            >
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>
                {product.wholesaleMinimalQuantity && product.quantity >= product.wholesaleMinimalQuantity ? (product.wholesalePrice?.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })) : (
                  product.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })
                )}
              </td>
              <td>
                {product.total.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
            </tr>
          ))
        ) : (
          <p>Selecione produtos para venda</p>
        )}
      </tbody>
    </table>
  );
};
