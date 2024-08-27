import { ProductsSold } from "../interfaces/products-sold";
import { useFilteredLogs } from "./useFilteredLogs";

export const useAggregateProducts = () => {
  const { filteredLogs } = useFilteredLogs();

  const aggregateProducts = () => {
    const productMap: { [key: string]: ProductsSold } = {};

    filteredLogs.forEach((sale) => {
      sale.products?.forEach((product) => {
        const key = `${product.product_Id}-${product.salePrice}`;
        if (!productMap[key]) {
          productMap[key] = { ...product };
        } else {
          productMap[key].quantity += product.quantity;
        }
      });
    });
    return Object.values(productMap).sort((a, b) => b.quantity - a.quantity);
  };

  const soldProducts = aggregateProducts();

  return { soldProducts };
};
