import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useCategorysData } from "../hooks/useCategoryData";
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface CategoryProps {
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

export const Category = ({selected, setSelected}: CategoryProps) => {
  const [searchParams] = useSearchParams();
  const categoryValue = searchParams.get('category')
  const { data, isSuccess, isLoading, isError } = useCategorysData();
  let groups: string[] = ['']
  if (data && isSuccess) {
    groups = [
      'Todas categorias',
      ...data.map(category => category)
    ]
  }
  
  useEffect(() => {
    if (categoryValue) setSelected(categoryValue);
    else setSelected(groups[0]);
    //eslint-disable-next-line
  }, [categoryValue, data])
  
  return (
    <Listbox value={selected} onChange={setSelected}>
    {({ open }) => (
      <>
        <div className="relative min-w-48">
          <ListboxButton disabled={isLoading && isError ? true : false}  className="relative w-full cursor-pointer rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-black dark:ring-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <span className="ml-3 block truncate font-bold">{isLoading && "Carregando..." || isError && "Nenhuma" || selected || groups[0] || 'Todas categorias'}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-black dark:text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-500 dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none sm:text-sm">
              {groups && groups.map((category, key) => (
                <ListboxOption
                  key={key}
                  className={({ focus }) =>
                    classNames(
                      focus ? 'bg-indigo-400 dark:bg-indigo-600 text-black dark:text-white' : 'text-zinc-900 dark:text-zinc-200',
                      'relative select-none py-2 pl-3 pr-9 cursor-pointer',
                    )
                  }
                  value={category || selected}
                >
                  {({ selected, focus }) => (
                    <>
                      <div className="flex items-center">
                        {selected ? (
                            <span
                              className={classNames(
                                focus ? 'text-black dark:text-white' : 'text-indigo-700 dark:text-indigo-500',
                                'absolute inset-y-0 left-1 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate', "text-black dark:text-zinc-200")}
                          >
                            {isLoading ? selected : category}
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

