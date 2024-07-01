import { useState } from "react";
import { useProductsData } from "../hooks/useProductsData";
import { EditProductModal } from "./EditProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useSearchParams } from "react-router-dom";
import { ProductCardSleketon } from "./ProductCardSleketon";
import { toast } from "sonner";

export const ProductCard = () => {
  const [searchParams] = useSearchParams();
  const { data: productData, isLoading, isSuccess } = useProductsData();
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [openRemoveProductModal, setOpenRemoveProductModal] = useState(false);
  const [productKey, setProductKey] = useState<number>();

  const productName = searchParams.get('productName')
  const productCategory = searchParams.get('category')

  const handleOpenEditModal = (id: number) => {
    setOpenEditProductModal(true)
    setProductKey(id)
  }

  const handleCloseEditModal = () => {
    setOpenEditProductModal(false); 
  };

  const handleOpenRemoveModal = (id: number) => {
    setOpenRemoveProductModal(true)
    setProductKey(id)
  }

  const handleCloseRemoveModal = () => {
    setOpenRemoveProductModal(false); 
  };

  if (!isSuccess) {
    toast.error("Falha ao encontrar produtos")
  }

  if (isLoading) {
    return (
      <>
        <ProductCardSleketon />
        <ProductCardSleketon />
        <ProductCardSleketon />
      </>
    )
  } 

  if (isSuccess && !productData?.length) {
    return (
      <div>Ainda não tem nenhum produto cadastrado</div>
    )
  }

  if (isSuccess && productData) {
    return (
      <>
        {productData.filter(product => productName !== null ? product.name.toLowerCase().includes(productName.toLowerCase()) : product.name).filter(product => productCategory !== null ? productCategory === product.group : product.group).map((product) => (
              <tr className="w-full" key={product.id}>
                <td>{product.group}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.purchasePrice.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {product.salePrice.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>
                  {product.validationDate
                    ? new Date(product.validationDate).toLocaleDateString("pt-BR")
                    : "--/--/----"}
                </td>
                <td>
                  <button className="text-brand-500 font-bold hover:text-opacity-80" onClick={() => handleOpenEditModal(product.id!)}>Editar</button>
                </td>
                {product.id && product.id === productKey ? (
                  <EditProductModal
                  id={product.id}
                  open={openEditProductModal}
                  handleClose={handleCloseEditModal}
                  />
                ) : null}
                  <td>
                    <button className="text-red-500 hover:text-red-600 dark:text-red-500 font-bold dark:hover:text-opacity-80" onClick={() => handleOpenRemoveModal(product.id!)}>Remover</button>
                  </td> 
                  {product.id === productKey && (
                  <ConfirmDeleteModal id={productKey} productName={product.name} open={openRemoveProductModal} handleClose={handleCloseRemoveModal}  /> 
                  )}
              </tr>
            ))}
      </>
    )
  }
}

