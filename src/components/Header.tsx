"use client"

import { CheckIcon } from "@heroicons/react/20/solid";
import {
  ChevronUpDownIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUserData } from "../hooks/useUserData";
import { useRouter } from "next/router";
import { useUserEditMutate } from "../hooks/useUserEditMutate";
import { UserData } from "../interfaces/user-data";


export const Header = () => {
  const { register, handleSubmit } = useForm();
  const { data: userData, isLoading, isSuccess } = useUserData();
  const { mutate, isPending } = useUserEditMutate();
  const [storeName, setStoreName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (isSuccess && userData && storeName === "")
      setStoreName(userData.name);
  }, [isSuccess]);

  const handleChangeStoreName = () => {
    mutate({
      name: storeName
    } as UserData);

    if (isSuccess) setIsModalOpen(false);
  };

  return (
    <div className="flex w-full justify-around p-4 border-b-[1px] border-gray-300 dark:border-gray-700">
      <div className="hidden min-[845px]:block" />
      <div>
        <button
          className="disabled:cursor-not-allowed text-nowrap transition-all font-bold p-2 rounded-md dark:hover:border-indigo-700 focus:outline-none text-indigo-700 hover:text-zinc-200 dark:hover:text-zinc-200 dark:text-indigo-500 dark:focus:border-indigo-700  hover:bg-indigo-700 border-2 border-indigo-700 dark:border-indigo-500"
          disabled={isLoading || !isSuccess}
          onClick={() => router.push("/cash-register")}
        >
          Abrir caixa
        </button>
      </div>
      <div >
        <div className="flex items-center gap-2">
          <div>
            <>
              <button
                className="disabled:cursor-not-allowed min-w-28 sticky font-bold text-nowrap gap-2 overflow-hidden z-10 flex items-center justify-between p-2 rounded-md ring-2 w-full ring-indigo-500 focus:outline-none focus:ring-indigo-700"
                onKeyDown={(e) =>
                  e.key === "Escape" && setIsModalOpen(false)
                }
                onClick={() => setIsModalOpen(!isModalOpen)}
                disabled={isLoading || !isSuccess}
                type="button"
              >
                <p>{isLoading ? "Carregando..." : isSuccess ? userData?.name : "Erro"}</p>
                <ChevronUpDownIcon className="w-4" />
              </button>
              <div
                className={`${isModalOpen ? "flex" : "hidden"
                  } justify-center top-0 left-0`}
                id="modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="modalTitle"
                aria-modal="true"
              >
                <div
                  className="absolute top-0 right-0 h-screen w-screen"
                  onClick={() => setIsModalOpen(false)}
                />
                <form
                  className="absolute top-16 z-10 flex gap-2 items-center"
                  onSubmit={handleSubmit(handleChangeStoreName)}
                  onKeyDown={(e) =>
                    e.key === "Escape" && setIsModalOpen(false)
                  }
                >
                  <input
                    type="text"
                    className="relative dark:bg-gray-700 ring-2 ring-indigo-500 focus:placeholder-shown:ring-red-500 placeholder-shown:ring-red-500 focus:ring-indigo-700 rounded-md p-2"
                    value={storeName}
                    autoComplete="off"
                    spellCheck="false"
                    {...register("storeName")}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Digite o nome da loja"
                  />
                  <button
                    className="absolute right-1 group dark:bg-gray-700 rounded-md"
                    type="submit"
                    disabled={!storeName || isPending || isLoading}
                    onClick={handleChangeStoreName}
                  >
                    <CheckIcon
                      className={`group-hover:fill-indigo-400 font-bold ${storeName
                        ? "dark:fill-zinc-200"
                        : "fill-red-500 group-hover:fill-red-500"
                        } w-6`}
                    />
                  </button>
                </form>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}
