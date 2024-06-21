import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../Data/api';
import Cookies from 'js-cookie';

const deleteProduct = async (id: number) => {
  const token = Cookies.get('token');
  return await api.delete(`/Products/${id}?token=${token}`, {params: {id}})
}

export const useProductDeleteMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products-data'] });
      queryClient.invalidateQueries({ queryKey: ['products-prices-data'] });
      queryClient.invalidateQueries({ queryKey: ['categorys-data'] });
    }
  })

  return mutate;
}

