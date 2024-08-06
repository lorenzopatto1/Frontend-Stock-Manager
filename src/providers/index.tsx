import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProductsProvider } from "../context/CartProductsContext";
import { ThemeProvider } from "../context/ThemeContext";
import { Toaster } from "../../@/components/ui/sonner";
import { ReactNode } from "react";

const client = new QueryClient();

interface IAppProviders {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProviders) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="stock-manager-theme">
      <QueryClientProvider client={client}>
        <CartProductsProvider>
          {children}
          <Toaster richColors />
        </CartProductsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
