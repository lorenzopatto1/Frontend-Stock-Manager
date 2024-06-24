import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { Category } from './Category';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'react-router-dom';

const productsFiltersSchema = yup.object({
  productName: yup.string().optional(),
  productCategory: yup.string().optional(),
})

type ProductsFiltersSchema = yup.InferType<typeof productsFiltersSchema>

export const Filters = () => {  
  const [searchParams, setSearchParams] = useSearchParams();

  const [selected, setSelected] = useState('');
  const { register, handleSubmit, reset } = useForm({ 
    resolver: yupResolver(productsFiltersSchema), 
    defaultValues: {
      productCategory: selected ?? 'all',
    }
  })

  const productName = searchParams.get('productName')

  const handleFilter = ({productName, productCategory}: ProductsFiltersSchema) => {
    productCategory = selected
   setSearchParams(state => {
     if (productName) {
       state.set('productName', productName)
     } else {
      state.delete('productName')
     }
     if (productCategory !== '' && productCategory !== 'Todas categorias') {
       state.set('category', productCategory)
     } else {
      state.delete('category')
     }
     return state
   })
  }

  const handleClearFilter = () => {
    reset()
    setSearchParams(state => {
      state.delete('productName')
      state.delete('category')
      return state;
    })
    selected !== 'Todas categorias' && setSelected('Todas categorias');
  }

  return (
    <div>
      <div className="w-fullp-2.5 rounded-md flex items-center gap-2">
        <h3 className="font-bold">Pesquisar:</h3> 
        
        <form className="w-full flex gap-10 text-sm" onSubmit={handleSubmit(handleFilter)}>
          <Input
            type="text"
            className="bg-transparent p-2 flex-1 shadow-sm ring-1 ring-inset rounded-md ring-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nome do produto"
            {...register("productName")}
            defaultValue={productName ? productName : ''}
          />
          <Category selected={selected} setSelected={setSelected} />
          <Button className="max-w-[20%] flex gap-2 shadow-sm ring-1 ring-inset ring-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md items-center p-[.3rem] text-gray-400 font-bold" type="submit"> 
            <MagnifyingGlassIcon className="w-5" />
            Filtrar resultados
          </Button>
          <Button type="button" className="max-w-[20%] flex gap-2 shadow-sm ring-1 ring-inset ring-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md items-center p-[.5rem] text-gray-400 font-bold" onClick={handleClearFilter}> 
            Limpar Filtros
          </Button>
        </form>
      </div>
    </div>
  )
}

