import React from "react";
import {Modal} from "@/ui/Modal";
import {getProducts} from "@/lib/products";
import {notFound} from "next/navigation";

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductModal({params}: Props) {
  const {id} = await params
  const products = await getProducts()
  const product = products.find((product) => product.id === id)
  // переписать способ получения продукта
  if (!product) {
    return notFound()
  }
  return (
    <Modal product={product} />
  )
}