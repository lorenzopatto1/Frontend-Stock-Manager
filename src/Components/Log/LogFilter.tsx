import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const LogFilterData = [
  "Hoje",
  "Ontem"
]

export const LogFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("Filter")

  const setFilter = (option: string) => {
    setSearchParams(state => {
        state.set("Filter", option);
      return state;
    })
  }
  
  useEffect(() => {
    if (filter) {
      if (filter === "Today") setFilter(LogFilterData[0]);
      if (filter === "Yesterday") setFilter(LogFilterData[1]);
    }
    else setFilter(LogFilterData[0]);
    //eslint-disable-next-line
  }, [filter])
  
  return (
    <Listbox value={filter} onChange={setFilter}>
    {({ open }) => (
      <>
        <div className="relative">
          <ListboxButton className="relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <span className="ml-3 block truncate">{filter || LogFilterData[0]}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none sm:text-sm">
              {LogFilterData.map((date, key) => (
                <ListboxOption
                  key={key}
                  className={({ focus }) =>
                    classNames(
                      focus ? 'bg-indigo-600 text-white' : '',
                      !focus ? 'text-gray-900' : '',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    )
                  }
                  value={date || filter}
                >
                  {({ selected, focus }) => (
                    <>
                      <div className="flex items-center">
                        {selected ? (
                            <span
                              className={classNames(
                                focus ? 'text-white' : 'text-indigo-500',
                                'absolute inset-y-0 left-1 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate', "text-zinc-200")}
                          >
                            {date}
                        </span>
                      </div>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </>
    )}
  </Listbox>
  )
}

