import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { api } from "../Data/api";
import Cookies from "js-cookie";
import { NavLink, useMatch, useNavigate } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";
import {
  ArrowLeftEndOnRectangleIcon,
  HomeIcon as HomeSolidIcon,
  DocumentDuplicateIcon as DocumentDuplicateSolidIcon,
} from "@heroicons/react/16/solid";
import { useStoreNameEditMutate } from "../hooks/useUserEditMutate";
import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";

const navigation = [
  {
    icon: <HomeIcon className="w-6" />,
    activeIcon: <HomeSolidIcon className="w-6" />,
    name: "Inicio",
    href: "/home",
    current: false,
  },
  {
    icon: <DocumentDuplicateIcon className="w-6" />,
    activeIcon: <DocumentDuplicateSolidIcon className="w-6" />,
    name: "Relatórios",
    href: "/logs",
    current: false,
  },
];

function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export const Nav = () => {
  const { register, handleSubmit } = useForm();
  const { data: userData, isSuccess } = useUserData();
  const { mutate } = useStoreNameEditMutate();
  const [storeName, setStoreName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isSuccess && userData && storeName === "")
      setStoreName(userData.storeName);
    //eslint-disable-next-line
  }, [isSuccess]);

  const handleChangeStoreName = () => {
    mutate(storeName);

    if (isSuccess) setIsModalOpen(false);
  };

  const homeMatch = useMatch("home");
  const logsMatch = useMatch("logs");

  const navigate = useNavigate();

  const Logout = async () => {
    const response = await api.post("Signout");
    if (response.status === 200) {
      Cookies.remove("token");
      navigate("/");
    }
  };

  return (
    <Disclosure as="nav" className="relative bg-gray-800 rounded-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
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
                              ? "bg-gray-900 text-white "
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium flex gap-2 items-center"
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
              <div className="w-[15%] absolute left-[40%]">
                <>
                  <button className="relative text-nowrap overflow-hidden z-10 flex justify-center items-center p-2 rounded-md ring-1 w-full ring-indigo-500 focus:outline-none focus:ring-indigo-700" onKeyDown={e => e.key === 'Escape' && setIsModalOpen(false)} onClick={() => setIsModalOpen(!isModalOpen)}type="button">
                    {userData?.storeName || "Carregando..."}
                    <ChevronUpDownIcon className="w-4 absolute right-2" />
                  </button>
                  <div className={`flex justify-center ${isModalOpen ? 'block' : 'hidden'}`} id="modal" tabIndex={-1} role="dialog" aria-labelledby="modalTitle"  aria-modal="true">
                    <div className="absolute top-0 right-0 h-screen w-screen"  onClick={() => setIsModalOpen(false)} />
                    <form
                      className="absolute top-16 z-10 flex gap-2 items-center"
                      onSubmit={handleSubmit(handleChangeStoreName)}
                      onKeyDown={e => e.key === 'Escape' && setIsModalOpen(false)}
                    >
                      <input
                        type="text"
                        className="relative bg-gray-700 ring-1 ring-indigo-500 focus:placeholder-shown:ring-red-500 placeholder-shown:ring-red-500 focus:ring-indigo-700 rounded-md p-2"
                        value={storeName}
                        autoComplete="off"
                        spellCheck="false"
                        {...register("storeName")}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Digite o nome da loja"
                      />
                      <button
                        className="absolute right-1 group bg-gray-700 rounded-md"
                        type="submit"
                        disabled={!storeName ? true : false}
                        onClick={handleChangeStoreName}
                      >
                        <CheckIcon
                          className={`group-hover:fill-indigo-400 font-bold ${
                            storeName.length < 1
                              ? "fill-red-500 group-hover:fill-red-500"
                              : "fill-zinc-200"
                          } w-6`}
                        />
                      </button>
                    </form>
                  </div>
                </>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
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
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 font-bold origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                          onClick={Logout}
                        >
                          <ArrowLeftEndOnRectangleIcon width={24} />
                          Sair
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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

          <DisclosurePanel className="md:hidden absolute w-screen h-screen flex flex-col bg-gray-800 z-10">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={NavLink}
                  to={item.href}
                  className={classNames(
                    homeMatch?.pathname === item.href ||
                      logsMatch?.pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
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
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center gap-4 px-5">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-white" />
                </div>
                <div>
                  <div className="text-base font-medium leading-none text-white">
                    {userData?.firstName}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {userData?.emailAddress}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  as="button"
                  onClick={Logout}
                  className="flex gap-4 rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <ArrowLeftEndOnRectangleIcon className="w-6" />
                  Sair
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
