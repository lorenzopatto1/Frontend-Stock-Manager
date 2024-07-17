import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Calendar from "react-calendar";
import "./calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const LogFilter = () => {
  const [, setSearchParams] = useSearchParams();
  const [filterDate, setFilterDate] = useState<Value>([new Date(), new Date()]);

  const setFilter = () => {
    setSearchParams((state) => {
      if (Array.isArray(filterDate) && filterDate[0] && filterDate[1] && filterDate[0].toLocaleDateString("pt-br") === filterDate[1].toLocaleDateString("pt-br")) {
        state.set("Data", filterDate[0].toLocaleDateString("pt-br"));
        state.delete("dataMinima");
        state.delete("dataMaxima");
      }
      if (Array.isArray(filterDate) && filterDate[0] && filterDate[1] && filterDate[0].toLocaleDateString("pt-br") !== filterDate[1].toLocaleDateString("pt-br")) {
        state.delete("Data");
        state.set("dataMinima", filterDate[0].toLocaleDateString("pt-br"));
        state.set("dataMaxima", filterDate[1].toLocaleDateString("pt-br"));
      }

      return state;
    });
  };

  useEffect(() => {
    setFilter();
    //eslint-disable-next-line
  }, [filterDate]);

  return (
    <Listbox>
      {({ open }) => (
        <>
          <div className="relative w-full flex justify-center">
            <ListboxButton className="relative cursor-pointer rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate font-bold text-xl">
                  {!Array.isArray(filterDate) &&
                    filterDate &&
                    filterDate.toLocaleDateString("pt-br")}
                  {Array.isArray(filterDate) &&
                    filterDate[0]?.toLocaleDateString("pt-br") !==
                    filterDate[1]?.toLocaleDateString("pt-br")
                    ? `${filterDate[0]?.toLocaleDateString(
                      "pt-br"
                    )} - ${filterDate[1]?.toLocaleDateString("pt-br")}`
                    : Array.isArray(filterDate) &&
                    filterDate[0]?.toLocaleDateString("pt-br")}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute top-16 z-20 overflow-auto rounded-md bg-white dark:bg-gray-800 text-base shadow-lg focus:outline-none sm:text-sm">
                <Calendar
                  className="dark:!bg-gray-800 !border-none !font-bold"
                  selectRange={true}
                  value={filterDate}
                  onChange={setFilterDate}
                  prevLabel={<ChevronLeftIcon className="w-6" />}
                  prev2Label={<ChevronDoubleLeftIcon className="w-6" />}
                  nextLabel={<ChevronRightIcon className="w-6" />}
                  next2Label={<ChevronDoubleRightIcon className="w-6" />}
                  tileClassName={"rounded-md hover:!bg-indigo-400 dark:hover:!bg-indigo-500"}
                />
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
