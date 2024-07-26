import { Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import { ChangeUserDataForm } from "./Forms/ChangeUserDataForm";
import { useState } from "react";
import { cn } from "../../../@/lib/utils"
import { ChangeFeeDataForm } from "./Forms/ChangeFeeForm";

type SectionProps = 'Dados do usuário' | 'Taxas da maquininha'

const sections: SectionProps[] = [
  "Dados do usuário",
  "Taxas da maquininha"
]


export const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [section, setSection] = useState<SectionProps>('Dados do usuário');

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
        className={` ${!settings && "hidden"
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
          <div className="absolute w-full h-full sm:w-3/4 sm:max-h-[80%] z-50 rounded-md bg-white dark:bg-gray-800">
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

            <div className="flex h-full p-3">
              <div className="flex flex-col gap-2 text-nowrap pr-4 border-r-[1px] border-r-gray-400 dark:border-r-gray-600">
                {sections.map(name => (
                  <button className={cn("text-start p-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 hover:dark:bg-gray-900 transition-all rounded-md font-bold", {
                    "bg-gray-400 dark:bg-gray-900": section === name
                  })} onClick={() => setSection(name)} type="button">{name}</button>
                ))}
              </div>
              <div className="flex flex-col w-full">
                {
                  section === sections[0] ? (
                    <>
                      <h1 className="font-bold mt-3 text-md sm:text-lg md:text-xl lg:text-2xl w-full text-center text-nowrap">Alterar informações de usuário:</h1>
                      <ChangeUserDataForm />
                    </>
                  ) : (
                    <>
                      <h1 className="font-bold mt-3 text-md sm:text-lg md:text-xl lg:text-2xl w-full text-center text-nowrap">Mudar taxa da maquininha:</h1>
                      <ChangeFeeDataForm />
                    </>
                  )
                }
              </div>
            </div>

          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};
