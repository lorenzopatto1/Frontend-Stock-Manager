import { useFilteredLogs } from "./useFilteredLogs";

export const useShowPayments = () => {
  const { filteredLogs } = useFilteredLogs();

  const sumPayments = (paymentType: string) => {
    return filteredLogs?.reduce((acc, log) => {
      if (log.firstPayment === paymentType) {
        acc += log.firstAmountPaid!;
      }
      if (log.secondPayment === paymentType && log.secondAmountPaid) {
        acc += log.secondAmountPaid;
      }
      return acc;
    }, 0);
  };
  
  const cashTotal = sumPayments("Dinheiro");
  const debitTotal = sumPayments("Débito");
  const creditTotal = sumPayments("Crédito");
  const pixTotal = sumPayments("Pix");
  const totalValue =
    filteredLogs?.reduce((acc, log) => (acc += log.totalSaleValue), 0) ?? 0;

  const totalPurchasePrice = filteredLogs
    ?.map(
      (log) =>
        log.products?.reduce<number>(
          (acc, product) => acc + product.purchasePrice * product.quantity,
          0
        ) || 0
    )
    .reduce((acc, cost) => acc + cost, 0);

  return Object.entries({
    Bruto: totalValue,
    Liquido: totalValue - totalPurchasePrice,
    Dinheiro: cashTotal,
    Débito: debitTotal,
    Crédito: creditTotal,
    Pix: pixTotal,
  });
};
