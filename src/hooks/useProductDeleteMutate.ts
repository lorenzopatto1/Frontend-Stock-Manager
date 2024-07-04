import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../data/api';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const deleteProduct = async (id: number) => {
  try {
    const token = Cookies.get('token');
    await api.delete(`/Products/${id}?token=${token}`, {params: {id}})
    toast.success("Produto removido!");
  } catch (_) {
    toast.error("Falha ao remover produto")
  }
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

