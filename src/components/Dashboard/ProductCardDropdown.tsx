import { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../@/components/ui/dropdown-menu"

interface IProductCardDropdown {
  children?: ReactNode;
}

export const ProductCardDropdown = ({ children }: IProductCardDropdown) => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <DropdownMenuItem>Remover</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}