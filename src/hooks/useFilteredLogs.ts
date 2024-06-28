import { useSearchParams } from "react-router-dom";
import { useLogData } from "./useLogData";

export const useFilteredLogs = () => {
  const { data: logs } = useLogData();
  const [searchParams] = useSearchParams();
  
  const date = searchParams.get("Data")
  const minDate = searchParams.get("dataMinima")
  const maxDate = searchParams.get("dataMaxima")
  
  const filteredLogs = logs?.filter((log) => {
    const logDate = new Date(log.saleDate).toLocaleDateString("pt-BR");
    return date
      ? logDate === date
      : minDate && maxDate && logDate >= minDate && logDate <= maxDate;
  }) || [];
  
  return { filteredLogs }
}