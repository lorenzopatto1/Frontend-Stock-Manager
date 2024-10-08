import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useProductDeleteMutate } from '../../hooks/useProductDeleteMutate';
import Loading from '../Loading';

interface ConfirmDeleteModalProps {
  open: boolean;
  handleClose: () => void;
  productName: string;
  id?: string;
}

export const ConfirmDeleteModal = ({ open, handleClose, productName, id }: ConfirmDeleteModalProps) => {
  const { mutate, isPending, isSuccess } = useProductDeleteMutate();

  const handleRemove = () => {
    if (id) mutate(id);

    if (isSuccess) {
      handleClose();
    }
  }
  return (
    <Transition show={open}>
      <Dialog className="relative z-9999" onClose={handleClose}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-10 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className=" bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-800 sm:mx-0 sm:h-10 sm:w-10">
                      <TrashIcon className="h-6 w-6 bg-white dark:bg-gray-800 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6">
                        Remover: {productName}
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-700 dark:text-gray-400">
                          Você tem certeza que deseja remover o produto?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 dark:hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleRemove}
                    disabled={isPending}
                  >
                    {isPending ? <Loading /> : 'Remover'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold transition-all text-black dark:text-zinc-200 shadow-sm ring-1 ring-inset ring-gray-400 dark:ring-gray-900 hover:bg-gray-400 dark:hover:bg-gray-950 sm:mt-0 sm:w-auto"
                    onClick={handleClose}
                    data-autofocus
                  >
                    Cancelar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
