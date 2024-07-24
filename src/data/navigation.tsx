import {
  DocumentDuplicateIcon as DocumentDuplicateSolidIcon,
  HomeIcon as HomeSolidIcon,
  CubeIcon as CubeSolidIcon
} from "@heroicons/react/16/solid";
import {
  DocumentDuplicateIcon,
  HomeIcon,
  CubeIcon
} from "@heroicons/react/24/outline";

export const navigation = [
  {
    icon: <HomeIcon className="w-6" / >,
    activeIcon: <HomeSolidIcon className="w-6" />,
    name: "Dashboard",
    href: "/home",
    current: false,
  },
  {
    icon: <CubeIcon className="w-6" / >,
    activeIcon: <CubeSolidIcon className="w-6" />,
    name: "Estoque",
    href: "/stock",
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