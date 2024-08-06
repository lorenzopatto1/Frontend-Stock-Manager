import {
  DocumentDuplicateIcon as DocumentDuplicateSolidIcon,
  CurrencyDollarIcon as CurrencyDollarSolidIcon,
  CubeIcon as CubeSolidIcon,
  BuildingLibraryIcon as BuildingLibrarySolidIcon
} from "@heroicons/react/16/solid";
import {
  DocumentDuplicateIcon,
  CubeIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";

export const navigation = [
  {
    icon: <CurrencyDollarIcon className="w-8" />,
    activeIcon: <CurrencyDollarSolidIcon className="w-8" />,
    name: "Painel financeiro",
    href: "/dashboard",
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
    name: "Relatório",
    href: "/log",
    current: false,
  },
  {
    icon: <BuildingLibraryIcon className="w-8" />,
    activeIcon: <BuildingLibrarySolidIcon className="w-8" />,
    name: "Despesas",
    href: "/expenses",
    current: false,
  }
];