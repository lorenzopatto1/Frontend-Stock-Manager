"use client"

import { useRouter } from "next/router";

import { navigation } from "../../data/navigation";

import { Profile } from "./Profile";
import { useState } from "react";
import Link from "next/link";

function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export const Nav = () => {
  const [openNavBar, setOpenNavBar] = useState(false);
  const router = useRouter();

  const navigate = (route: string) => {
    router.push(route);
  }

  const isPathMatched = (href: string) => {
    return router.pathname === href;
  };

  return (
    <aside className="relative">

      <div className="w-16 h-full" />

      {openNavBar && (
        <div
          className="fixed inset-0 z-[11] bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity"
          onClick={() => setOpenNavBar(false)}
        />
      )}

      <div
        className={classNames(
          openNavBar ? "w-[80vw] sm:w-[50vw] lg:w-[30vw]" : "w-16 items-center",
          "top-0 absolute z-20 gap-4 bg-gray-200 dark:bg-gray-800 flex flex-col p-2 h-full transition-all duration-300 ease-in-out overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        )}
        onClick={() => setOpenNavBar(true)}
      >
        <div className="py-2 flex-shrink-0 flex cursor-pointer items-center">
          <img
            className="h-12 w-12"
            src="/icon.svg"
            alt="Your Company"
            onClick={() => navigate('/dashboard')}
          />
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={
                classNames(
                  isPathMatched(item.href)
                    ? "bg-gray-400 dark:bg-gray-900 text-white"
                    : "bg-gray-50 hover:bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium transition-all flex gap-2 items-center"
                )
              }
              aria-current={item.current ? "page" : undefined}
            >
              {isPathMatched(item.href)
                ? item.activeIcon
                : item.icon
              }
              <span
                className={classNames(!openNavBar ? "sr-only opacity-0" : "opacity-100", "transition-all delay-100")}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
        <Profile />
      </div>
    </aside>
  )
}
