import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../data/api';
import Cookies from 'js-cookie';

const editStoreName = async (storeName: string) => {
  const token = Cookies.get('token');
  return await api.put(`/StoreName/?token=${token}&storeName=${storeName}`)
}

export const useStoreNameEditMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: editStoreName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
    }
  })

  return mutate;
}

