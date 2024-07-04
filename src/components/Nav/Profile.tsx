import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTheme } from "../../context/ThemeContext";

interface ProfileProps {
  logOut: () => void;
}

export const Profile = ({ logOut }: ProfileProps) => {
  const { theme, setTheme } = useTheme();
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex max-w-xs items-center rounded-full dark:bg-gray-800 text-sm focus:outline-none focus:outline-2 focus:outline-gray-500 dark:focus:outline-gray-700 focus:outline-offset-2 dark:focus:outline-offset-gray-800">
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 font-bold origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem
            className="text-left text-md w-full flex gap-2 px-4 py-2 bg-white text:zinc-800 dark:bg-gray-800 black:text-zinc-200 focus:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
            as="button"
          >
            <Cog6ToothIcon className="w-6 stroke-2" />
            Configurações
          </MenuItem>
          <MenuItem
            className="text-left text-md w-full flex gap-2 px-4 py-2 bg-white text:zinc-800 dark:bg-gray-800 black:text-zinc-200 focus:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
            as="button"
            onClick={() => {
              theme === "light" || theme === "system" ? setTheme("dark") : theme === "dark" || theme === "system" ? setTheme("light") : setTheme("system")
            }}
          >
            {theme === "light" ? (
              <>
                <MoonIcon className="w-6 stroke-2" />
                Escuro
              </>
            ) : (
              <>
                <SunIcon className="w-6 stroke-2" />
                Claro
              </>
            )}
          </MenuItem>
          <MenuItem
            className="text-left text-md w-full flex gap-2 px-4 py-2 bg-white text:zinc-800 dark:bg-gray-800 black:text-zinc-200 focus:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
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
