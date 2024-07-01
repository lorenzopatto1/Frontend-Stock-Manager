import { ProductsSold } from "../interfaces/products-sold";
import { useFilteredLogs } from "./useFilteredLogs";

export const useAggregateProducts = () => {
  const { filteredLogs } = useFilteredLogs();
  
  const aggregateProducts = () => {
    const productMap: { [key: number]: ProductsSold } = {};

    filteredLogs.forEach((sale) => {
      sale.products?.forEach((product) => {
        if (product.productId && !productMap[product.productId]) {
          productMap[product.productId] = { ...product };
        } else {
          product.productId ? productMap[product.productId].quantity += product.quantity : null;
        }
      });
    });

    return Object.values(productMap).sort((a, b) => b.quantity - a.quantity);
  };
  
  return { aggregateProducts }
}
