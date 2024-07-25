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
  const logDate = new Date(log.saleDate || '');
    
    if (parsedMinDate && parsedMaxDate) {
      const maxDateWithTime = new Date(parsedMaxDate);
      maxDateWithTime.setDate(maxDateWithTime.getDate() + 1);
      maxDateWithTime.setHours(4, 0, 0, 0);
      return logDate >= parsedMinDate && logDate < maxDateWithTime;
    }
    
    if (parsedDate) {
      const nextDay = new Date(parsedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(4, 0, 0, 0);
      return logDate >= parsedDate && logDate < nextDay;
    } else {
      const today = stripTime(new Date());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(4, 0, 0, 0);
      return logDate >= today && logDate < tomorrow;
    }
    
  }) || [];
  
  return { filteredLogs };
};