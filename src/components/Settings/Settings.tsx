import { Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import { Form } from "./Form";


export const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  const settings = searchParams.get("settings");

  const handleCloseSettings = () => {
    setSearchParams((state) => {
      state.delete("settings");
      return state;
    });
  };

  return (
    <Transition show={!!settings}>
      <div
        className={` ${
          !settings && "hidden"
        } absolute z-20 w-full h-full flex items-center justify-center`}
      >
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
            onClick={handleCloseSettings}
          />
        </TransitionChild>
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute w-full h-full sm:w-2/4 sm:h-auto z-50 rounded-md bg-white dark:bg-gray-800">
            <div className="absolute items-center justify-center left-10 sm:left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
              <button
                type="button"
                className="relative rounded-md text-black dark:text-gray-300 hover:text-zinc-800 black:hover:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                onClick={handleCloseSettings}
              >
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col w-full items-center">
              <h1 className="font-bold mt-3 p-2 text-md sm:text-lg md:text-xl lg:text-2xl w-full text-center text-nowrap">Alterar informações de usuário:</h1>
              <Form />
            </div>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};
