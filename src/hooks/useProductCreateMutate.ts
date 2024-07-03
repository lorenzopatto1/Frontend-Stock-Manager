import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductData } from '../interfaces/product-data';
import { api } from '../Data/api';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const createProduct = async (data: ProductData) => {
  try {
    const token = Cookies.get('token');
    await api.post(`/Products?token=${token}`, data)
    toast.success("Produto criado!")
  } catch (_) {
    toast.error("Falha ao criar produto")
  }
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

