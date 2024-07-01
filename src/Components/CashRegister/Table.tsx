import { useCartProducts } from "../../Context/CartProductsContext";
import { ProductsSold } from "../../interfaces/products-sold";

export const Table = () => {

  const { productsInCart, productFocus, setProductFocus, handleRemoveProductAtCart } = useCartProducts();

  const handleSelect = (product: ProductsSold) => {
    if (product.productId !== productFocus?.productId) {
      setProductFocus(product);
    } else {
      setProductFocus(undefined);
    }
  };

  return (
    <table className="table-fixed text-xs md:text-sm lg:text-base text-nowrap divide-ydivide-gray-700 w-full">
      <thead className="sticky top-0 z-9 bg-gray-400 text-white dark:bg-gray-800">
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700 relative">
        {productFocus && (
          <button
            onClick={handleRemoveProductAtCart}
            className="absolute -top-9 right-4 z-10 font-bold text-red-500 hover:text-red-400"
          >
            Remover
          </button>
        )}
        {productsInCart ? (
          productsInCart.map((product) => (
            <tr
              key={product.productId}
              className={`${
                productFocus?.productId === product.productId && "!bg-indigo-500 dark:!bg-indigo-600 "
              } hover:bg-indigo-400 dark:hover:bg-indigo-900 relative transition-all cursor-pointer`}
              onClick={() => handleSelect(product)}
            >
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>
                {product.wholesaleMinimalQuantity &&
                product.quantity >= product.wholesaleMinimalQuantity
                  ? product.wholesalePrice?.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : product.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
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
