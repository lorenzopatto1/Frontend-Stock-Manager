import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../Data/api';
import Cookies from 'js-cookie';
import { SaleRelatory } from '../interfaces/products-sold';

const postRelatory = async (data: SaleRelatory) => {
  const token = Cookies.get('token');
  return await api.post(`/Relatory/?token=${token}`, data)
}

export const useRelatoryMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postRelatory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products-data'] });
      queryClient.invalidateQueries({ queryKey: ['products-prices-data'] });
      queryClient.invalidateQueries({ queryKey: ['categorys-data'] });
    }
  })

  return mutate;
}

