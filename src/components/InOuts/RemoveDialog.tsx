"use client"

import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import Loading from "../Loading";
import { useInOutsDeleteMutate } from "../../hooks/useInOutsDeleteMutate";

export function RemoveDialog() {
  const { mutate, isPending, isSuccess } = useInOutsDeleteMutate();
  const searchParams = useSearchParams();
  const router = useRouter();

  const remove = searchParams.get("remove");

  const handleClose = () => {
    router.replace(router.pathname)
  }

  const handleRemoveInOut = () => {
    if (remove) mutate(remove)

    if (isSuccess) router.replace(router.pathname);
  }

  return (
    <Transition show={!!remove}>
      <Dialog className="relative" onClose={handleClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center sm:p-0 ">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative flex flex-col items-center p-4 transform rounded-lg bg-white dark:bg-gray-950 text-left shadow-xl transition-all">
                <div className="dark:bg-gray-950 p-4 flex-1">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="md:text-base lg:text-xl text-base text-nowrap font-semibold leading-6"
                    >
                      Tem certeza que deseja remover?
                    </DialogTitle>
                    <div>


                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    className="hover:opacity-80 bg-red-600 py-1.5 px-3 rounded-md transition-all"
                    disabled={
                      isPending
                    }
                    onClick={handleRemoveInOut}
                    type="button"
                  >
                    {isPending ? <Loading /> : 'Remover'}
                  </button>
                  <button className="hover:opacity-80 hover:bg-gray-400 dark:hover:bg-gray-800 py-1.5 px-3 rounded-md transition-all" onClick={handleClose}>Voltar</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}