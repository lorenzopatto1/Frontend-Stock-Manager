import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductsData } from "../hooks/useProductsData";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { EditProductModal } from "./EditProductModal";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const ProductCard = () => {
  const [searchParams] = useSearchParams();
  const { data: productData, isLoading, isSuccess } = useProductsData();
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [openRemoveProductModal, setOpenRemoveProductModal] = useState(false);
  const [productKey, setProductKey] = useState<number>();

  const productName = searchParams.get("productName");
  const productCategory = searchParams.get("category");

  const handleOpenEditModal = (id: number) => {
    setOpenEditProductModal(true);
    setProductKey(id);
  };

  const handleCloseEditModal = () => {
    setOpenEditProductModal(false);
  };

  const handleOpenRemoveModal = (id: number) => {
    setOpenRemoveProductModal(true);
    setProductKey(id);
  };

  const handleCloseRemoveModal = () => {
    setOpenRemoveProductModal(false);
  };

  if (isLoading) {
    return (
      <>
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </>
    );
  }

  if (isSuccess && !productData?.length) {
    return <div className="mt-4">Ainda não tem nenhum produto cadastrado</div>;
  }

  if (isSuccess && productData) {
    return (
      <>
        {productData
          .filter((product) =>
            productName !== null
              ? product.name.toLowerCase().includes(productName.toLowerCase())
              : product.name
          )
          .filter((product) =>
            productCategory !== null
              ? productCategory === product.group
              : product.group
          )
          .map((product) => (
            <tr className="w-full text-xs sm:text-sm lg:text-base" key={product.id}>
              <td>
                <abbr title={product.group}>{product.group}</abbr>
              </td>
              <td>
                <abbr title={product.name}>{product.name}</abbr>
              </td>
              <td>
                <abbr title={product.quantity.toString()}>
                  {product.quantity}
                </abbr>
              </td>
              <td className="hidden min-[530px]:table-cell">
                <abbr
                  title={product.purchasePrice.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                >
                  {product.purchasePrice.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </abbr>
              </td>
              <td className="hidden min-[392px]:table-cell">
                <abbr
                  title={product.salePrice.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                >
                  {" "}
                  {product.salePrice.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </abbr>
              </td>
              <td className="hidden md:table-cell">
                <abbr
                  title={
                    product.validationDate
                      ? new Date(product.validationDate).toLocaleDateString(
                          "pt-BR"
                        )
                      : "--/--/----"
                  }
                >
                  {product.validationDate
                    ? new Date(product.validationDate).toLocaleDateString(
                        "pt-BR"
                      )
                    : "--/--/----"}
                </abbr>
              </td>
              <td className="hidden xl:table-cell">
                <button
                  className="text-indigo-500 font-bold hover:text-opacity-80"
                  onClick={() => handleOpenEditModal(product.id!)}
                >
                  Editar
                </button>
              </td>
              {product.id && product.id === productKey ? (
                <EditProductModal
                  id={product.id}
                  open={openEditProductModal}
                  handleClose={handleCloseEditModal}
                />
              ) : null}
              <td className="hidden xl:table-cell">
                <button
                  className="text-red-500 hover:text-red-600 dark:text-red-500 font-bold dark:hover:text-opacity-80"
                  onClick={() => handleOpenRemoveModal(product.id!)}
                >
                  Remover
                </button>
              </td>
              {product.id === productKey && (
                <ConfirmDeleteModal
                  id={productKey}
                  productName={product.name}
                  open={openRemoveProductModal}
                  handleClose={handleCloseRemoveModal}
                />
              )}
            </tr>
          ))}
      </>
    );
  } else {
    return (<p>Houve um erro ao carregar suas informações.</p>)
  }
};
