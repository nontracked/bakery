import {ProductPage} from "@/components/ProductPage";
import {getProducts} from "@/lib/products";
import {notFound} from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPageServer({params}: ProductPageProps) {
  const {id} = await params
  const products = await getProducts()
  const product = products.find((product) => product.id === id)
  if (!product) {
    return notFound()
  }
  return (
    <ProductPage product={product}/>
  )
}