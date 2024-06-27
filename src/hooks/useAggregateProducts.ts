import { ProductsSold } from "../interfaces/products-sold";
import { useFilteredLogs } from "./useFilteredLogs";

export const useAggregateProducts = () => {
  const { filteredLogs } = useFilteredLogs();
  
  const aggregateProducts = () => {
    const productMap: { [key: number]: ProductsSold } = {};

    filteredLogs.forEach((sale) => {
      sale.products.forEach((product) => {
        if (!productMap[product.productId]) {
          productMap[product.productId] = { ...product };
        } else {
          productMap[product.productId].quantity += product.quantity;
        }
      });
    });

    return Object.values(productMap);
  };
  
  return { aggregateProducts }
}
