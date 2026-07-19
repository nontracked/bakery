import React from "react";
import {Modal} from "@/ui/Modal";
import {notFound} from "next/navigation";
import {getProductById} from "@/db/queries";

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductModal({params}: Props) {
  const {id} = await params
  const product = await getProductById(id)
  if (!product) {
    return notFound()
  }
  return (
    <Modal product={product} />
  )
}
