"use client"

import { useSearchParams } from "next/navigation";
import { Button } from "../Button";
import { Category } from '../Category';
import { Input } from "../Input";
import { useRouter } from "next/router";

export const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = router.pathname;

  const productName = searchParams.get('productName')

  const handleNameFilter = (productName: string) => {
    if (productName.length >= 1) {
      router.replace({
        query: { ...router.query, productName }
      })
    } else {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete("productName")
      router.push(`${path}?${nextSearchParams.toString()}`)
    }
  }

  const handleClearFilter = () => {
    router.replace(path);
  }

  return (
    <div className="flex">
      <div className="w-full rounded-md flex items-center gap-2">
        <h3 className="font-bold">Pesquisar:</h3>

        <div className="w-full flex gap-10 text-sm">
          <Input
            type="text"
            className="bg-transparent p-2 flex-1 shadow-sm ring-1 ring-inset rounded-md placeholder:text-black dark:placeholder:text-zinc-200  ring-black dark:ring-gray-500 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nome do produto"
            value={productName ?? ''}
            onChange={(e) => handleNameFilter(e.target.value)}
            autoComplete="new-password"
          />
          <Category />
          <Button type="button" className="hidden text-nowrap xl:flex gap-2 shadow-sm ring-1 ring-inset ring-black dark:ring-gray-500 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md items-center p-[.5rem] dark:text-gray-400 font-bold" onClick={handleClearFilter}>
            Limpar Filtros
          </Button>
        </div>
      </div>
    </div>
  )
}

