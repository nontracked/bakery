import {ProductPage} from "@/components/ProductPage";
import {getProductById} from "@/lib/products";
import {notFound} from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPageServer({params}: ProductPageProps) {
  const {id} = await params
  const product = await getProductById(id)
  if (!product) {
    return notFound()
  }
  return (
    <ProductPage product={product}/>
  )
}