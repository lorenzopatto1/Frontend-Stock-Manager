import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx"

import 'react-toastify/dist/ReactToastify.css';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './routes/Dashboard.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Logs from './routes/Logs.tsx'
import { Login } from './routes/Login.tsx'
import { CashRegister } from './routes/CashRegister.tsx'
import Payment from './Components/Payment.tsx';
import { CartProductsProvider } from './Context/CartProductsContext.tsx';

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
    path: "/home",
    element: <Dashboard />
  },
  {
    path: "/logs",
    element: <Logs />
  },
  {
    path: "/cash-register",
    element: <CashRegister />
  },
  {
    path: "/payment",
    element: <Payment />
  },
])

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <CartProductsProvider>
        <RouterProvider router={router} />
      </CartProductsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
