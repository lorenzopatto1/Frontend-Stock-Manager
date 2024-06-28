import { useFilteredLogs } from "./useFilteredLogs";

export const useShowPayments = () => {
  const { filteredLogs } = useFilteredLogs();
  const sumPayments = (paymentType: string) => {
    return filteredLogs?.reduce((acc, log) => {
      if (log.firstPayment === paymentType) {
        acc += log.firstAmountPaid;
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
    filteredLogs?.reduce((acc, log) => (log.secondAmountPaid ? acc += log.firstAmountPaid + log.secondAmountPaid : acc += log.firstAmountPaid), 0) ?? 0;


  return Object.entries({
    Ganhos: totalValue,
    Dinheiro: cashTotal,
    Débito: debitTotal,
    Crédito: creditTotal,
    Pix: pixTotal
  });
};
