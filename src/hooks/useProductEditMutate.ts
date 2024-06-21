import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductData } from '../interfaces/product-data';
import { api } from '../Data/api';
import Cookies from 'js-cookie';

const editProduct = async (data: ProductData) => {
  const token = Cookies.get('token');
  return await api.put(`/Products/?token=${token}`, data)
}

export const useProductEditMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products-data'] });
      queryClient.invalidateQueries({ queryKey: ['products-prices-data'] });
      queryClient.invalidateQueries({ queryKey: ['categorys-data'] });
    }
  })

  return mutate;
}

