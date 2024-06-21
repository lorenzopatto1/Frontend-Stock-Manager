import { useQuery } from "@tanstack/react-query";
import { api } from "../Data/api";

import Cookies from 'js-cookie'
import { AxiosPromise } from "axios";
import { UserData } from "../interfaces/user-data";

const getUser = async (): AxiosPromise<UserData> => {
  const token = Cookies.get('token');
  const response = await api.get<UserData>("/User", {
    params: {
      token
    }
  });
  return response;
}

export function useUserData ()
{
  const query = useQuery({
    queryFn: getUser,
    queryKey: ['user-data']
  });
  
  return {
    ...query,
    data: query.data?.data,
    storeName: query.data?.data.storeName
  };
}