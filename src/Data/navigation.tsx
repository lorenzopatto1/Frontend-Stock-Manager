import {
  DocumentDuplicateIcon as DocumentDuplicateSolidIcon,
  HomeIcon as HomeSolidIcon
} from "@heroicons/react/16/solid";
import {
  DocumentDuplicateIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

export const navigation = [
  {
    icon: <HomeIcon className="w-6" / >,
    activeIcon: <HomeSolidIcon className="w-6" />,
    name: "Inicio",
    href: "/home",
    current: false,
  },
  {
    icon: <DocumentDuplicateIcon className="w-6" />,
    activeIcon: <DocumentDuplicateSolidIcon className="w-6" />,
    name: "Relatórios",
    href: "/log",
    current: false,
  },
];