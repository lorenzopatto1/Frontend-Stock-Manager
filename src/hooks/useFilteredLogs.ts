import { useSearchParams } from "react-router-dom";
import { useLogData } from "./useLogData";

export const useFilteredLogs = () => {
  const { data: logs } = useLogData();
  const [searchParams] = useSearchParams();
  
  const filter = searchParams.get("Filter")
  
  const today = new Date().toLocaleDateString("pt-br");
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const filteredLogs = logs?.filter((log) => {
    const logDate = new Date(log.saleDate).toLocaleDateString("pt-BR");
    return filter === "Hoje"
      ? logDate === today
      : logDate === yesterday.toLocaleDateString("pt-br");
  }) || [];
  
  return { filteredLogs, today, yesterday }
}