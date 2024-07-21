import { useSearchParams } from "react-router-dom";
import { useLogData } from "./useLogData";

export const useFilteredLogs = () => {
  const { data: logs } = useLogData();
  const [searchParams] = useSearchParams();

  const date = searchParams.get("Data");
  const minDate = searchParams.get("dataMinima");
  const maxDate = searchParams.get("dataMaxima");

  const parseDate = (dateString: string | null) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const stripTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };
  const parsedMinDate = minDate ? stripTime(parseDate(minDate)!) : null;
  const parsedMaxDate = maxDate ? stripTime(parseDate(maxDate)!) : null;
  const parsedDate = date ? stripTime(parseDate(date)!) : null;
  
  const filteredLogs = logs?.filter((log) => {
    const logDate = stripTime(new Date(log.saleDate || ''));
    
    if (parsedMinDate && parsedMaxDate) {
      return logDate >= parsedMinDate && logDate <= parsedMaxDate;
    }

    if (parsedDate) {
      return logDate.getTime() === parsedDate.getTime();
    } else {
      const today = stripTime(new Date());
      return logDate.getTime() === today.getTime();
    }
    
  }) || [];
  
  console.log(filteredLogs)
  return { filteredLogs };
};