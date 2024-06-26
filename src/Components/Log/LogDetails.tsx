import { useLogData } from "../../hooks/useLogData";

export const LogDetails = () => {
  const { data: logs } = useLogData();

  const today = new Date().toLocaleDateString("pt-br");

  const cashFormat = (value: number) => {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };
  console.log(logs);

  if (logs) {
    const sumPayments = (paymentType: string) => {
      return logs?.reduce((acc, log) => {
        if (
          log.firstPayment === paymentType &&
          new Date(log.saleDate).toLocaleDateString("pt-br") === today
        ) {
          acc += log.firstAmountPaid;
        }
        if (
          log.secondPayment === paymentType &&
          log.secondAmountPaid &&
          new Date(log.saleDate).toLocaleDateString("pt-br") === today
        ) {
          acc += log.secondAmountPaid;
        }
        return acc;
      }, 0);
    };

    const cashTotal = sumPayments("Dinheiro");
    const debitTotal = sumPayments("Débito");
    const creditTotal = sumPayments("Crédito");
    const pixTotal = sumPayments("Pix");
    const totalValue = logs
      .filter(
        (log) => new Date(log.saleDate).toLocaleDateString("pt-br") === today
      )
      .reduce((acc, log) => (acc += log.totalValue), 0);

    return (
      <div className="flex flex-col gap-4 w-screen">
        <div>Filtrar pelo dia: {today}</div>
        <div className="flex w-[80%] justify-between mt-4">
          <h3 className="text-2xl font-bold text-green-400">
            Ganhos: {cashFormat(totalValue)}
          </h3>
          <h3 className="text-2xl font-bold text-green-400">
            Dinheiro: {cashFormat(cashTotal)}
          </h3>
          <h3 className="text-2xl font-bold text-green-400">
            Débito: {cashFormat(debitTotal)}
          </h3>
          <h3 className="text-2xl font-bold text-green-400">
            Crédito: {cashFormat(creditTotal)}
          </h3>
          <h3 className="text-2xl font-bold text-green-400">
            Pix: {cashFormat(pixTotal)}
          </h3>
        </div>
        <div className="gap-4 flex-col flex p-12 rounded-md w-[80vw] bg-gray-950 h-[80vh]">
          <div>
            <table className="table-fixed w-full text-nowrap divide-y divide-gray-700">
              <thead className="sticky top-0 z-10 bg-gray-800">
                <tr>
                  <th>Produto</th>
                  <th>Quantidade Vendida</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 text-nowrap divide-y divide-gray-700">
                {logs
                  .filter(
                    (log) =>
                      new Date(log.saleDate).toLocaleDateString("pt-br") ===
                      today
                  )
                  .map((log) =>
                    log.products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col ">
      Ainda não temos registros de vendas...
    </div>
  );
};
