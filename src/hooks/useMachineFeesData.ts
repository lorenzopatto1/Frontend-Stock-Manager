import Cookies from "js-cookie";
import { api } from "../data/api";
import { useQuery } from "@tanstack/react-query";
import { IMachineFees } from "../interfaces/machine-fees";

const getMachineFees = async () => {
  const establishment_Id = Cookies.get("establishment_Id");

  const response = await api.get<IMachineFees>(
    `/machine-fees/${establishment_Id}`
  );

  return response;
};

export function useMachineFeesData() {
  const query = useQuery({
    queryFn: getMachineFees,
    queryKey: ["machineFees-data"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
