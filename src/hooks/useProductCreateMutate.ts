import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductData } from '../interfaces/product-data';
import { api } from '../Data/api';
import Cookies from 'js-cookie';

const createProduct = async (data: ProductData) => {
  const token = Cookies.get('token');
  return await api.post(`/Products?token=${token}`, data)

}

export const useProductCreateMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products-data'] });
      queryClient.invalidateQueries({ queryKey: ['products-prices-data'] });
      queryClient.invalidateQueries({ queryKey: ['categorys-data'] });
    }
  })

  return mutate;
}

