import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

interface PaymentOptionsProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>
  paymentOptions: string[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const PaymentOptions = ({ selected, setSelected, paymentOptions }: PaymentOptionsProps) => {

  return (
    <Listbox value={selected} onChange={setSelected}>
    {({ open }) => (
      <>
        <div className="font-bold relative mt-4 mb-8">
          <ListboxButton className="relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-700 dark:ring-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-700 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <span className="ml-3 block truncate">{selected ?? paymentOptions[0]}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-300 dark:bg-gray-800 py-1 text-base shadow-lg focus:outline-none sm:text-sm">
              {paymentOptions.map((option, key) => (
                <ListboxOption
                  key={key}
                  className={({ selected, focus }) =>
                    classNames(
                      selected ? '!bg-indigo-400 dark:bg-indigo-600 dark:text-white' : 'text-gray-900', focus ? 'hover:bg-indigo-300' : '',
                      'relative cursor-default select-none py-2 pl-3 pr-9 transition-all',
                    )
                  }
                  value={option || selected} 
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center">
                        {selected ? (
                            <span
                              className={classNames(
                                selected ? 'text-white' : 'text-indigo-500',
                                'absolute inset-y-0 left-1 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate', "dark:text-zinc-200")}
                          >
                            {option}
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

export default PaymentOptions