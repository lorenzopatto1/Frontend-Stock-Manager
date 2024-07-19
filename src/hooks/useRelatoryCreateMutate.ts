import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../data/api';
import Cookies from 'js-cookie';
import { SaleRelatory } from '../interfaces/products-sold';
import { toast } from 'sonner';

const postRelatory = async (data: SaleRelatory) => {
  try {
    const token = Cookies.get('token');
    await api.post(`/Relatory/?token=${token}`, data)
    toast.success("Venda concluida");
  } catch (_) {
    toast.error("Erro na venda");
  }
}

export const useRelatoryCreateMutate = () => {
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

