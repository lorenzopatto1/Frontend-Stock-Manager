import {
  DocumentDuplicateIcon as DocumentDuplicateSolidIcon,
  HomeIcon as HomeSolidIcon,
  CubeIcon as CubeSolidIcon,
  BuildingLibraryIcon as BuildingLibrarySolidIcon
} from "@heroicons/react/16/solid";
import {
  DocumentDuplicateIcon,
  HomeIcon,
  CubeIcon,
  BuildingLibraryIcon
} from "@heroicons/react/24/outline";

export const navigation = [
  {
    icon: <HomeIcon className="w-8" />,
    activeIcon: <HomeSolidIcon className="w-8" />,
    name: "Dashboard",
    href: "/home",
    current: false,
  },
  {
    icon: <CubeIcon className="w-8" />,
    activeIcon: <CubeSolidIcon className="w-8" />,
    name: "Estoque",
    href: "/stock",
    current: false,
  },
  {
    icon: <DocumentDuplicateIcon className="w-8" />,
    activeIcon: <DocumentDuplicateSolidIcon className="w-8" />,
    name: "Relatórios",
    href: "/log",
    current: false,
  },
  {
    icon: <BuildingLibraryIcon className="w-8" />,
    activeIcon: <BuildingLibrarySolidIcon  className="w-8" />,
    name: "Despesas",
    href: "/expenses",
    current: false,
  }
];