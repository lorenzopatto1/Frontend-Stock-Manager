"use client"

import React from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useInOutsData } from "../../hooks/useInOutsData"
import { RemoveDialog } from "./RemoveDialog"
import { useRouter } from "next/router"

export const Table = () => {
  const { data } = useInOutsData();
  const router = useRouter();

  const handleOpenRemoveDialog = (id: string) => {
    router.replace({
      query: { ...router.query, remove: id }
    })
  }

  return (
    <div className="flex p-4 h-full bg-gray-300 dark:bg-gray-950 rounded-md">
      <div className="flex w-full items-start justify-center text-xs md:text-sm lg:text-base xl:text-lg overflow-x-hidden overflow-y-auto">
        <table className="table-auto w-full relative">
          <thead className="sticky top-0 bg-gray-400 dark:bg-gray-900">
            <tr>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Data</th>
              <th className="sr-only">Editar/Remover</th>
            </tr>
          </thead>
          <tbody className="text-nowrap divide-y divide-gray-700">
            {
              data && data.length >= 1
                ? (
                  data.map(d => (
                    <tr key={d.id}>
                      <td>
                        {d.type === "In" ? "Entrada" : "Saída"}
                      </td>
                      <td>{d.description}</td>
                      <td className={d.type === "Out" ? "text-red-500" : "text-green-500"}>
                        {d.value.toLocaleString("pt-br", {
                          currency: "BRL",
                          style: "currency"
                        })}
                      </td>
                      <td>{new Date(d.date).toLocaleDateString("pt-br")}</td>
                      <td>
                        <div className="flex gap-2">
                          <PencilSquareIcon className="w-6 cursor-pointer stroke-indigo-500 hover:opacity-70" />
                          <TrashIcon className="w-6 cursor-pointer stroke-red-500 hover:opacity-70" onClick={() => handleOpenRemoveDialog(d.id)} />
                          <RemoveDialog />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td>Não encontramos registros</td></tr>
                )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
