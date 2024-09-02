import Cookies from "js-cookie";
import { api } from "../data/api";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { IInOutFormData } from "../components/InOuts/Form";

export interface IInOutsResponse extends IInOutFormData {
  id: string;
  establishment_Id: string;
}

const getInOuts = async () => {
  const establishment_Id = Cookies.get("establishment_Id");

  try {
    const response = await api.get<IInOutsResponse[] | []>(
      `/in-outs/all/${establishment_Id}`
    );

    return response;
  } catch (_) {
    toast.error("Não encontramos suas entradas/saídas");
  }
};

export const useInOutsData = () => {
  const query = useQuery({
    queryFn: getInOuts,
    queryKey: ["in-outs-data"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
};
