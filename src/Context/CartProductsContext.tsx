import { ReactNode, createContext, useContext, useState } from "react";
import { ProductsSold } from "../interfaces/products-sold";
import { ProductData } from "../interfaces/product-data";

interface CartProductsProviderProps {
  children: ReactNode;
}

type CartProductsContextProps = {
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

  const total = productsInCart.reduce((acc, product) => acc += product.total, 0);

  const handleSelectProduct = (productData: ProductData) => {
    const quantity = 1;
    const productAlreadyInCart = productsInCart && productsInCart.find(product => product.id === productData.id)

    if (productAlreadyInCart) 
      {
        productAlreadyInCart.quantity += 1;
        productAlreadyInCart.total = productData.wholesaleMinimalQuantity && productData.wholesaleUnityPrice && productAlreadyInCart.quantity >= productData.wholesaleMinimalQuantity ? productData.wholesaleUnityPrice * productAlreadyInCart.quantity : productData.salePrice * productAlreadyInCart.quantity
      }
    else 
      setProductsInCart(prevState => [...prevState, data]);
    
    const data: ProductsSold = {
      ...productAlreadyInCart,
      id: productData.id!,
      name: productData.name,
      price: productData.salePrice,
      wholesalePrice: productData.wholesaleUnityPrice ?? null,
      wholesaleMinimalQuantity: productData.wholesaleMinimalQuantity ?? null,
      quantity: productAlreadyInCart?.quantity || quantity,
      total: productData.wholesaleMinimalQuantity && productData.wholesaleUnityPrice && quantity >= productData.wholesaleMinimalQuantity ? productData.wholesaleUnityPrice * quantity : productData.salePrice * quantity
    }
    
    setProductSearch('');
    setProductFocus(data);
  }

  const handleRemoveProductAtCart = () => {
    if (productFocus) {
      setProductsInCart(prevState => [
        ...prevState.filter(product => product.id !== productFocus.id)
      ])

        setProductFocus(undefined);
    }
  }

  return (
    <CartProductsContext.Provider value={{productsInCart, setProductsInCart, productFocus, setProductFocus, total, handleRemoveProductAtCart, productSearch, setProductSearch, handleSelectProduct}}>
      {children}
    </CartProductsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCartProducts = () => useContext(CartProductsContext);