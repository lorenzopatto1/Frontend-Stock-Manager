import { useEffect, useState } from "react";
import { SaleData } from "../Components/CashRegister/SaleData"
import { Table } from "../Components/CashRegister/Table"
import { useProductsData } from "../hooks/useProductsData";
import { ProductsSold } from "../interfaces/products-sold";
import { ProductData } from "../interfaces/product-data";
import { ToastContainer, toast } from "react-toastify";


export const CashRegister = () => {
  const [productSearch, setProductSearch] = useState('');
  const [searchProductModal, setSearchProductModal] = useState(false);
  const { data, isError } = useProductsData();
  const [productsInCart, setProductsInCart] = useState<ProductsSold[]>([]);
  const [productFocus, setProductFocus] = useState<ProductsSold>();

  useEffect(() => {
    if (productSearch.length >= 1) setSearchProductModal(true);
  }, [productSearch])

  const handleSelectProduct = (productData: ProductData) => {
    const quantity = 1;
    const productAlreadyInCart = productsInCart.find(product => product.id === productData.id)

    if (productAlreadyInCart) 
      {
        productAlreadyInCart.quantity += 1;
        productAlreadyInCart.total = productData.wholesaleMinimalQuantity && productData.wholesaleUnityPrice && productAlreadyInCart.quantity >= productData.wholesaleMinimalQuantity ? productData.wholesaleUnityPrice * productAlreadyInCart.quantity : productData.salePrice * productAlreadyInCart.quantity
      }
    else 
      setProductsInCart(prevState => [...prevState, data]);
    
    const data: ProductsSold = {
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

  const total = productsInCart.reduce((acc, product) => acc += product.total, 0);


  const hasProduct = data?.find(product => product.name.toLocaleLowerCase().startsWith(productSearch.toLowerCase()))

  if (isError) {
    toast.error("Houve um problema ao encontrar seus produtos")
  }
  
    return (
      <div className="relative flex py-12 px-[15%] h-full flex-col w-screen items-center" onClick={() => searchProductModal && setSearchProductModal(false)}>
        <ToastContainer theme="dark" limit={1} position="top-center" />
          <input className="bg-transparent p-2 rounded-md ring-1 focus:ring-indigo-500 ring-zinc-500 w-[50%]" autoComplete="new-password" autoCorrect="off" type="text" placeholder="Nome do produto" value={productSearch} onClick={() => !searchProductModal && setSearchProductModal(true)} onChange={(e) => setProductSearch(e.target.value)}/>
          {searchProductModal && productSearch && (
            <div className="fixed rounded-md flex-col top-24 z-10 w-[35%] flex justify-center bg-gray-700 p-2">
          {hasProduct ? data?.filter(product => product.name.toLocaleLowerCase().startsWith(productSearch.toLowerCase())).map(product => (
            <div className="p-2 w-full rounded-md hover:bg-gray-800" key={product.id} onClick={() => handleSelectProduct(product)}>{product.name}</div>
          )): (
            <div>Nenhum produto com esse nome...</div>
          )}
          </div>
          )
          }
          <div className="flex mt-4 flex-1 w-full bg-[#00081d] rounded-md p-2 overflow-y-auto items-start justify-center">
            <Table productsInCart={productsInCart} productFocus={productFocus} setProductFocus={setProductFocus} />
          </div>
          <SaleData productFocus={productFocus} total={total} />
      </div>
    )
  }

