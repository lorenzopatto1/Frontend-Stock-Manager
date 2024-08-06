"use client"

import { ReactNode, createContext, useContext, useState } from "react";
import { ProductsSold, SaleRelatory } from "../interfaces/products-sold";
import { ProductData } from "../interfaces/product-data";

interface CartProductsProviderProps {
  children: ReactNode;
}

type CartProductsContextProps = {
  sale: SaleRelatory | undefined
  setSale: React.Dispatch<React.SetStateAction<SaleRelatory | undefined>>
  productsInCart: ProductsSold[]
  setProductsInCart: React.Dispatch<React.SetStateAction<ProductsSold[]>>
  productFocus: ProductsSold | undefined
  setProductFocus: React.Dispatch<React.SetStateAction<ProductsSold | undefined>>
  productSearch: string;
  setProductSearch: React.Dispatch<React.SetStateAction<string>>
  handleSelectProduct: (productData: ProductData) => void
  total: number
  handleRemoveProductAtCart: () => void;
}

const CartProductsContext = createContext({} as CartProductsContextProps);

export function CartProductsProvider({ children }: CartProductsProviderProps) {
  const [productsInCart, setProductsInCart] = useState<ProductsSold[]>([]);
  const [productFocus, setProductFocus] = useState<ProductsSold>();
  const [productSearch, setProductSearch] = useState('');
  const [sale, setSale] = useState<SaleRelatory>();

  const total = Number(productsInCart.reduce((acc, product) => (
    product.wholesaleMinimalQuantity && product.quantity >= product.wholesaleMinimalQuantity
      ? acc += product.wholesalePrice! * product.quantity
      : acc += product.total
  ), 0).toFixed(2));

  const handleSelectProduct = (productData: ProductData) => {
    const quantity = 1;
    const productAlreadyInCart = productsInCart && productsInCart.find(product => product.productId === productData.id)

    const data: ProductsSold = {
      ...productAlreadyInCart,
      productId: productData.id,
      type: productData.type,
      group: productData.group,
      name: productData.name,
      purchasePrice: productData.purchasePrice,
      price: productData.salePrice,
      wholesalePrice: productData.wholesaleUnityPrice ?? null,
      wholesaleMinimalQuantity: productData.wholesaleMinimalQuantity ?? null,
      quantity: productAlreadyInCart?.quantity || quantity,
      total: productData.wholesaleMinimalQuantity && quantity >= productData.wholesaleMinimalQuantity ? productData.wholesaleUnityPrice! * quantity : productData.salePrice * quantity
    }

    if (productAlreadyInCart) {
      productAlreadyInCart.quantity += 1;
      productAlreadyInCart.total = productData.wholesaleMinimalQuantity && productData.wholesaleUnityPrice && productAlreadyInCart.quantity >= productData.wholesaleMinimalQuantity ? productData.wholesaleUnityPrice * productAlreadyInCart.quantity : productData.salePrice * productAlreadyInCart.quantity
    }
    else
      setProductsInCart(prevState => [...prevState, data]);


    setProductSearch('');
    setProductFocus(data);
  }
  const handleRemoveProductAtCart = () => {
    if (productFocus) {
      setProductsInCart(prevState => [
        ...prevState.filter(product => product.productId !== productFocus.productId)
      ])
      setProductFocus(undefined);
    }
  }

  return (
    <CartProductsContext.Provider value={{ sale, setSale, productsInCart, setProductsInCart, productFocus, setProductFocus, total, handleRemoveProductAtCart, productSearch, setProductSearch, handleSelectProduct }}>
      {children}
    </CartProductsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCartProducts = () => useContext(CartProductsContext);