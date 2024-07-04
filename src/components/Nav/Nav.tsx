import {
  Disclosure,
  DisclosureButton
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  ChevronUpDownIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
import { navigation } from "../../data/navigation";
import { useUserData } from "../../hooks/useUserData";
import { useStoreNameEditMutate } from "../../hooks/useUserEditMutate";
import { useUserLogout } from "../../hooks/useUserLogout";
import { MobileNav } from "./MobileNav";
import { Profile } from "./Profile";

import Cookies from "js-cookie";

function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export const Nav = () => {
  const { register, handleSubmit } = useForm();
  const { data: userData, isSuccess } = useUserData();
  const { mutate } = useStoreNameEditMutate();
  const { mutate: logoutMutate, isError } = useUserLogout();
  const [storeName, setStoreName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && userData && storeName === "")
      setStoreName(userData.storeName);
    //eslint-disable-next-line
  }, [isSuccess]);

  const handleChangeStoreName = () => {
    mutate(storeName);

    if (isSuccess) setIsModalOpen(false);
  };

  const logOut = () => {
    logoutMutate();
    if (!isError) {
      Cookies.remove("token");
      navigate('/');
    }
  }

  const homeMatch = useMatch("home");
  const logsMatch = useMatch("logs");

  return (
    <Disclosure as="nav" className="relative bg-gray-300 dark:bg-gray-800 md:rounded-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/home')}>
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-gray-400 dark:bg-gray-900 text-white"
                              : "bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium transition-all flex gap-2 items-center"
                          )
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {homeMatch?.pathname === item.href ||
                        logsMatch?.pathname === item.href
                          ? item.activeIcon
                          : item.icon}
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                  <Link className="text-nowrap transition-all font-bold p-2 rounded-md dark:hover:border-indigo-700 focus:outline-none text-indigo-700 hover:text-zinc-200 dark:hover:text-zinc-200 dark:text-indigo-500 dark:focus:border-indigo-700  hover:bg-indigo-700 border-2 border-indigo-700 dark:border-indigo-500" to="/cash-register">
                    Abrir caixa
                  </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center gap-2 md:ml-6">
                  <div>
                    <>
                      <button
                        className="sticky font-bold text-nowrap gap-2 overflow-hidden z-10 flex justify-center items-center p-2 rounded-md ring-2 w-full ring-indigo-500 focus:outline-none focus:ring-indigo-700"
                        onKeyDown={(e) =>
                          e.key === "Escape" && setIsModalOpen(false)
                        }
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        type="button"
                      >
                        {userData?.storeName || "Carregando..."}
                        <ChevronUpDownIcon className="w-4" />
                      </button>
                      <div
                        className={`${
                          isModalOpen ? "flex" : "hidden"
                        } justify-center top-0 left-0`}
                        id="modal"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="modalTitle"
                        aria-modal="true"
                      >
                        <div
                          className="absolute top-0 right-0 h-screen w-screen"
                          onClick={() => setIsModalOpen(false)}
                        />
                        <form
                          className="absolute top-16 z-10 flex gap-2 items-center"
                          onSubmit={handleSubmit(handleChangeStoreName)}
                          onKeyDown={(e) =>
                            e.key === "Escape" && setIsModalOpen(false)
                          }
                        >
                          <input
                            type="text"
                            className="relative dark:bg-gray-700 ring-2 ring-indigo-500 focus:placeholder-shown:ring-red-500 placeholder-shown:ring-red-500 focus:ring-indigo-700 rounded-md p-2"
                            value={storeName}
                            autoComplete="off"
                            spellCheck="false"
                            {...register("storeName")}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setStoreName(e.target.value)}
                            placeholder="Digite o nome da loja"
                          />
                          <button
                            className="absolute right-1 group dark:bg-gray-700 rounded-md"
                            type="submit"
                            disabled={!storeName ? true : false}
                            onClick={handleChangeStoreName}
                          >
                            <CheckIcon
                              className={`group-hover:fill-indigo-400 font-bold ${
                                storeName
                                  ? "fill-red-500 group-hover:fill-red-500"
                                  : "dark:fill-zinc-200"
                              } w-6`}
                            />
                          </button>
                        </form>
                      </div>
                    </>
                  </div>

                  <Profile logOut={logOut} />
                  
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md dark:bg-gray-800 p-2 text-black dark:text-gray-400 hover:bg-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>
              <MobileNav logOut={logOut} userData={userData!} />
        </>
      )}
    </Disclosure>
  );
};
