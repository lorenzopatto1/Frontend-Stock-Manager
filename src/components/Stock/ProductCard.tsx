"use client"

import { useState } from "react";
import { useProductsData } from "../../hooks/useProductsData";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { EditProductModal } from "./EditProductModal";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

export const ProductCard = () => {
  const searchParams = useSearchParams();
  const { data: productData, isLoading, isSuccess } = useProductsData();
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [openRemoveProductModal, setOpenRemoveProductModal] = useState(false);
  const [productKey, setProductKey] = useState<string>();
  const router = useRouter();

  const productName = searchParams.get("productName");
  const productCategory = searchParams.get("category");

  const handleOpenEditModal = (id?: string) => {
    setOpenEditProductModal(true);
    if (id) setProductKey(id);
  };
  const handleCloseEditModal = () => {
    const path = router.pathname
    setOpenEditProductModal(false);

    router.push(path)
  };

  const handleOpenRemoveModal = (id?: string) => {
    setOpenRemoveProductModal(true);
    if (id) setProductKey(id);
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

  if (!isSuccess && !productData) {
    return (<p>Houve um erro ao carregar suas informações.</p>)
  }
  return (
    <>
      {productData
        ?.filter((product) =>
          productName !== null
            ? product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().startsWith(productName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
            : product.name
        )
        .filter((product) =>
          productCategory !== null
            ? productCategory === product.category
            : product.category
        )
        .map((product) => (
          <tr className="w-full text-xs sm:text-sm lg:text-base" key={product.id}>
            <td>
              <abbr title={product.category}>{product.category}</abbr>
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
            <div className="hidden xl:flex justify-center gap-4 py-3 pr-6 ">
              <button
                className="text-indigo-500 font-bold hover:text-opacity-80"
                onClick={() => handleOpenEditModal(product.id)}
              >
                <PencilSquareIcon className="w-6" />
              </button>

              {product.id === productKey ? (
                <EditProductModal
                  id={productKey}
                  open={openEditProductModal}
                  handleClose={handleCloseEditModal}
                />
              ) : null}

              <button
                className="text-red-500 hover:text-red-600 dark:text-red-500 font-bold dark:hover:text-opacity-80"
                onClick={() => handleOpenRemoveModal(product.id)}
              >
                <TrashIcon className="w-6" />
              </button>
              {product.id === productKey && (
                <ConfirmDeleteModal
                  id={productKey}
                  productName={product.name}
                  open={openRemoveProductModal}
                  handleClose={handleCloseRemoveModal}
                />
              )}
            </div>
          </tr>
        ))}
    </>
  );

};
