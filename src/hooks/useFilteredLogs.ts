import { useSearchParams } from "react-router-dom";
import { useLogData } from "./useLogData";

export const useFilteredLogs = () => {
  const { data: logs } = useLogData();
  const [searchParams] = useSearchParams();
  
  const date = searchParams.get("Data")
  const minDate = searchParams.get("dataMinima")
  const maxDate = searchParams.get("dataMaxima")
  
  const filteredLogs = logs?.filter((log) => {
    const today = new Date().toLocaleDateString("pt-BR");
    const logDate = new Date(log.saleDate || '').toLocaleDateString("pt-BR");
    return !!minDate && !!maxDate
      ? minDate && maxDate && logDate >= minDate && logDate <= maxDate
      : date ?  logDate === date : logDate === today;
  }) || [];
  
  return { filteredLogs }
}