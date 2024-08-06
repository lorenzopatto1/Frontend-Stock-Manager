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

import Cookies from "js-cookie";
import { useUserLogout } from "../../hooks/useUserLogout";
import { useRouter } from "next/router";

export const Profile = () => {
  const { theme, setTheme } = useTheme();

  const { mutate: logOut, isError } = useUserLogout();
  const router = useRouter();

  const handleOpenSettings = () => {
    const path = router.pathname
    router.push(`${path}/?settings=open`)
  }

  const logoutMutate = () => {
    logOut();
    if (!isError) {
      Cookies.remove("token");
      router.push('/');
    }
  };

  return (
    <Menu as="div" className="relative">
      <div className="flex">
        <MenuButton className="relative flex max-w-xs items-center rounded-full dark:bg-gray-800 text-sm focus:outline-none focus:outline-2 focus:outline-gray-500 dark:focus:outline-gray-700 focus:outline-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Abrir menu do usuário</span>
          <div className="h-10 w-10 rounded-full bg-gray-600 dark:bg-white" />
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
        <MenuItems className="absolute left-14 bottom-0 z-10 mt-2 w-48 font-bold origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem
            className="text-left text-md w-full flex gap-2 px-4 py-2 bg-white text:zinc-800 dark:bg-gray-800 black:text-zinc-200 focus:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700"
            as="button"
            onClick={handleOpenSettings}
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
            onClick={logoutMutate}
          >
            <ArrowLeftEndOnRectangleIcon width={24} />
            Sair
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};
