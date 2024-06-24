import {
  ArrowLeftEndOnRectangleIcon
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";

interface ProfileProps {
  logOut: () => void
}

export const Profile = ({logOut}: ProfileProps) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Abrir menu do usuário</span>
          <div className="h-8 w-8 rounded-full bg-white" />
        </MenuButton>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems   className="absolute right-0 z-10 mt-2 w-48 font-bold origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem
            className="text-left text-md w-full flex gap-2 px-4 py-2 bg-gray-800 text-zinc-200 focus:bg-gray-700 hover:bg-gray-700"
            as="button"
          >
            <Cog6ToothIcon className="w-6 stroke-2" />
            Configurações
          </MenuItem>
          <MenuItem
            className="text-left text-md w-full flex gap-2 px-4 py-2 text-zinc-00 focus:bg-gray-700 hover:bg-gray-700"
            as="button"
            onClick={logOut}
          >
            <ArrowLeftEndOnRectangleIcon width={24} />
            Sair
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

