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

  const setStartOfDay = (date: Date, hour = 0) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour);
  };

  const setEndOfNextDay = (date: Date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(4, 0, 0, 0);
    return nextDay;
  };

  const parsedMinDate = minDate ? setStartOfDay(parseDate(minDate)!) : null;
  const parsedMaxDate = maxDate ? setEndOfNextDay(parseDate(maxDate)!) : null;
  const parsedDate = date ? setStartOfDay(parseDate(date)!) : null;

  const filteredLogs = logs?.filter((log) => {
    const logDate = new Date(log.saleDate || '');

    if (parsedMinDate && parsedMaxDate) {
      return logDate >= parsedMinDate && logDate < parsedMaxDate;
    }

    if (parsedDate) {
      const startDay = setStartOfDay(parsedDate, 4)
      const endOfNextDay = setEndOfNextDay(parsedDate);
      return logDate >= startDay && logDate < endOfNextDay;
    }
    const today = setStartOfDay(new Date(), 4); // Start today at 4:00 AM
    const endOfToday = setEndOfNextDay(today);
    return logDate >= today && logDate < endOfToday;
  }) || [];

  return { filteredLogs };
};