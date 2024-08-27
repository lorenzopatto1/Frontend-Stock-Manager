"use client"

import { ReactNode, createContext, useCallback, useContext, useState } from "react";
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
  productFocus: ProductData | undefined
  setProductFocus: React.Dispatch<React.SetStateAction<ProductData | undefined>>
  productSearch: string;
  setProductSearch: React.Dispatch<React.SetStateAction<string>>
  handleSelectProduct: (productData: ProductData) => void
  total: number
  handleRemoveProductAtCart: () => void;
}

const CartProductsContext = createContext({} as CartProductsContextProps);

export function CartProductsProvider({ children }: CartProductsProviderProps) {
  const [productsInCart, setProductsInCart] = useState<ProductsSold[]>([]);
  const [productFocus, setProductFocus] = useState<ProductData>();
  const [productSearch, setProductSearch] = useState('');
  const [sale, setSale] = useState<SaleRelatory>();

  const total = Number(productsInCart.reduce((acc, product) => (
    acc += product.salePrice * product.quantity
  ), 0).toFixed(2));

  const totalIfWholesale = useCallback((
    quantity: number,
    salePrice: number,
    wholesaleMinimalQuantity: number | null,
    wholesaleUnityPrice: number | null
  ) => {
    if (wholesaleMinimalQuantity && wholesaleUnityPrice)
      if (quantity >= wholesaleMinimalQuantity) {
        return Number((wholesaleUnityPrice * quantity).toFixed(2))
      }

    return Number((salePrice * quantity).toFixed(2))

  }, [])

  const handleSelectProduct = (productData: ProductData) => {
    const quantity = 1;
    const productAlreadyInCart = productsInCart.find(product => product.product_Id === productData.id)

    const data: ProductsSold = {
      ...productAlreadyInCart,
      product_Id: productData.id,
      type: productData.type,
      category: productData.category,
      name: productData.name,
      purchasePrice: productData.purchasePrice,
      salePrice: productData.salePrice,
      quantity: productAlreadyInCart?.quantity || quantity,
      total: totalIfWholesale(quantity, productData.salePrice, productData.wholesaleMinimalQuantity, productData.wholesaleUnityPrice)
    }
    if (productAlreadyInCart) {
      productAlreadyInCart.quantity += 1;
      productAlreadyInCart.total = totalIfWholesale(productAlreadyInCart.quantity, productData.salePrice, productData.wholesaleMinimalQuantity, productData.wholesaleUnityPrice)
    }
    else {
      setProductsInCart(prevState => [...prevState, data]);
    }
    setProductSearch('');
    setProductFocus(productData)
  }

  const handleRemoveProductAtCart = () => {
    if (productFocus) {
      setProductsInCart(prevState => [
        ...prevState.filter(product => product.product_Id !== productFocus.id)
      ])
      setProductFocus(undefined);
    }
  }

  return (
    <CartProductsContext.Provider
      value={
        {
          sale,
          setSale,
          productsInCart,
          setProductsInCart,
          productFocus,
          setProductFocus,
          total,
          handleRemoveProductAtCart,
          productSearch,
          setProductSearch,
          handleSelectProduct
        }
      }>
      {children}
    </CartProductsContext.Provider>
  )
}


export const useCartProducts = () => useContext(CartProductsContext);