import { useQuery } from "@tanstack/react-query";
import { api } from "../data/api";

import Cookies from "js-cookie";
import { AxiosPromise } from "axios";
import { UserData } from "../interfaces/user-data";

const getUser = async (): AxiosPromise<UserData> => {
  const response = await api.get<UserData>("/matrixes");

  const establishment_Id = await response.data.establishments[0].id;

  Cookies.set("establishment_Id", establishment_Id);

  return response;
};

export function useUserData() {
  const query = useQuery({
    queryFn: getUser,
    queryKey: ["user-data"],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
