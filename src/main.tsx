import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx"

import 'react-toastify/dist/ReactToastify.css';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Stock } from './routes/Stock.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Log } from './routes/Log.tsx'
import { Login } from './routes/Login.tsx'
import { CashRegister } from './routes/CashRegister.tsx'
import Payment from './components/Payment/Payment.tsx';
import { CartProductsProvider } from './context/CartProductsContext.tsx';

import { Toaster } from "../@/components/ui/sonner.tsx"
import { ThemeProvider } from './context/ThemeContext.tsx';
import { Dashboard } from './routes/Dashboard.tsx';
import { Expenses } from './routes/Expenses.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/stock",
    element: <Stock />
  },
  {
    path: "/home",
    element: <Dashboard />
  },
  {
    path: "/log",
    element: <Log />
  },
  {
    path: "/cash-register",
    element: <CashRegister />
  },
  {
    path: "/payment",
    element: <Payment />
  },
  {
    path: "/expenses",
    element: <Expenses />
  }
])

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <CartProductsProvider>
        <ThemeProvider defaultTheme="light" storageKey="stock-manager-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
        <Toaster richColors />
      </CartProductsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
