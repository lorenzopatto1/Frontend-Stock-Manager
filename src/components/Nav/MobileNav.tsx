import { NavLink, useMatch, useSearchParams } from "react-router-dom";

import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";

import { navigation } from "../../data/navigation";
import { UserData } from "../../interfaces/user-data";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

interface MobileNavProps {
  userData: UserData;
  logOut: () => void;
}

function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export const MobileNav = ({ userData, logOut }: MobileNavProps) => {
  const [, setSearchParams] = useSearchParams();
  const homeMatch = useMatch("home");
  const logsMatch = useMatch("log");

  const handleOpenSettings = () => {
    setSearchParams((state) => {
      state.set("settings", "open");
      return state;
    });
  };

  return (
    <DisclosurePanel className="md:hidden absolute w-screen h-screen flex flex-col bg-white dark:bg-gray-800 z-50">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as={NavLink}
            to={item.href}
            className={classNames(
              homeMatch?.pathname === item.href ||
                logsMatch?.pathname === item.href
                ? "bg-gray-300 text-black dark:bg-gray-900 dark:text-white"
                : "text-black hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
              "rounded-md px-3 py-2 text-base font-medium flex gap-4"
            )}
            aria-current={homeMatch || logsMatch ? "page" : undefined}
          >
            {homeMatch?.pathname === item.href ||
            logsMatch?.pathname === item.href
              ? item.activeIcon
              : item.icon}
            {item.name}
          </DisclosureButton>
        ))}
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700 pb-3 pt-4">
        <div className="flex items-center gap-4 px-5">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rounded-full ring-1 ring-black bg-white" />
          </div>
          <div>
            <div className="text-base font-medium leading-none dark:text-white">
              {userData?.firstName}
            </div>
            <div className="text-sm font-medium leading-none text-gray-600 dark:text-gray-400">
              {userData?.emailAddress}
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1 px-2">
        <DisclosureButton
         className="flex gap-4 rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          as="button"
          onClick={handleOpenSettings}
        >
          <Cog6ToothIcon className="w-6 stroke-2" />
          Configurações
        </DisclosureButton>
          <DisclosureButton
            as="button"
            onClick={logOut}
            className="flex gap-4 rounded-md px-3 py-2 text-base font-medium hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <ArrowLeftEndOnRectangleIcon className="w-6" />
            Sair
          </DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  );
};
